import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActivitiesService} from "../../../services/activities/activities.service";
import {FormBuilder, FormGroup} from '@angular/forms';
import {DatePipe} from "@angular/common";
import {FilterPipe} from "../../../pipes/filter.pipe";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-activity-edit',
    templateUrl: './activity-edit.component.html',
    providers: [DatePipe],
    styleUrls: ['./activity-edit.component.css']
})
export class ActivityEditComponent implements OnInit {

    activity;
    user;

    uploadForm: FormGroup;

    loading: boolean;

    inputs = [];

    keepCurrent = false;

    userGroups = [];

    // setting standard deadline for subscription deadline field
    deadline = {
        subscriptionDeadline: this.datePipe.transform(new Date(), "yyyy-MM-dd")
    };

    dateOptions = {
        formatYear: 'yy',
        maxDate: new Date().setFullYear(new Date().getFullYear() + 10), // maximum date for datepicker
        minDate: new Date(), // minimum date for datepicker
        startingDay: 1
    };

    // options for question types
    types = ["☰ text", "◉ multiple choice", "☑ checkboxes"];

    constructor(titleService: Title,
                private activatedRoute: ActivatedRoute,
                private activitiesService: ActivitiesService,
                private formBuilder: FormBuilder,
                private datePipe: DatePipe,
                private filterPipe: FilterPipe) {
        this.loading = true;

        titleService.setTitle("Edit Activity");

        this.uploadForm = this.formBuilder.group({
            image: 'No Image'
        });
    }

    ngOnInit(): void {
        this.activity = this.activatedRoute.snapshot.data.activity;
        this.activity.date = this.datePipe.transform(this.activity.date, "yyyy-MM-dd");
        this.activity.organizer = this.activity.Organizer.fullName;

        this.user = this.activatedRoute.snapshot.data.currentUser;

        for (const group of this.user.groups) {
            if (group.canOrganize) {
                this.userGroups.push(group.fullName);
            }
        }

        // formatting the form to inputs such that it can be interactive with angular
        if (this.activity.canSubscribe) {
            for (let i = 0; i < this.activity.numberOfQuestions; i++) {
                const options = [];
                for (const option of this.activity.formOptions[i]) {
                    options.push({op: option});
                }
                this.inputs.push({
                    fullQuestion: this.activity.questionDescriptions[i],
                    type: this.activity.typeOfQuestion[i],
                    options,
                    required: (this.activity.required[i] === 'true'),
                    privacyOfQuestion: (this.activity.privacyOfQuestions[i] === 'true')
                });
            }

            this.deadline.subscriptionDeadline = this.activity.subscriptionDeadline;
        }

        // If not subscription form was submitted initially then add the standard two questions to input
        if (this.inputs.length === 0) {
            this.inputs = [
                {fullQuestion: 'Name', type: "name", options: [{op: ''}], required: 'true', privacyOfQuestion: 'false'},
                {fullQuestion: 'TU/e email', type: "TU/e email", options: [{op: ''}],
                    required: 'true', privacyOfQuestion: 'false'}
            ];
        }

        if (this.activity.hasCoverImage) {
            this.keepCurrent = true;
        }

        this.loading = false;
    }

    // adds an element to the inputs variable
    add() {
        const dataObj = {fullQuestion: '', type: "☰ text", options: [{op: 'Option 1'}], required: '', privacyOfQuestion: ''};
        this.inputs.push(dataObj);
    }

    // Removes specific question
    removeInput(index) {
        if (index > 1 && index < this.inputs.length) {
            this.inputs.splice(index, 1);
        }
    }

    // Adds an option to a multiple choice question
    addOption(input) {
        const option = {op: 'option ' + (input.options.length + 1).toString()};
        input.options.push(option);
    }

    // Remove specific option from a multiple choice question
    removeOption(inputIndex, optionIndex) {
        this.inputs[inputIndex].options.splice(optionIndex, 1);
    }

    // Toggles the canSubscribe variable
    toggleSubscribe() {
        this.activity.canSubscribe = !this.activity.canSubscribe;
    }

    // Toggles the keepCurrent variable
    toggleKeepCurrent() {
        this.keepCurrent = !this.keepCurrent;
    }

    // Given an array, it moves the element from fromIndex to toIndex
    arrayMove(arr, fromIndex, toIndex) {
        if (Math.abs(fromIndex - toIndex) <= 1 && fromIndex > 1 && toIndex < arr.length) {
            const element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
        }
    }

    wrongInput(ErrorMessage) {
        this.loading = false;
        return alert(ErrorMessage);
    }

    onFileSelect(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.uploadForm.get('image').setValue(file);
        } else {
            this.uploadForm.get('image').setValue('No Image');
        }
    }

    groupFilterCallback(group, query) {
        return group.canOrganize === true;
    }

    submit() {
        this.loading = true;

        let changedCoverImage = false;
        if (this.uploadForm.get('image').value !== 'No Image' && !this.keepCurrent) {
            this.activity.hasCoverImage = true;
            changedCoverImage = true;
        }

        const fd = new FormData();
        if (changedCoverImage) {
            const file = this.uploadForm.get('image').value;

            if (!file.type.startsWith('image/')) {
                return this.wrongInput('Non-image formats are not supported as pictures for activities!');
            }

            if (file.size - 1000000 > 0) {
                return this.wrongInput('Image size is larger than 1MB');
            }

            const img = new Image();
            img.src = window.URL.createObjectURL(file);
            img.onload = () => {
                if (img.width < img.height) {
                    return this.wrongInput('Image width should be greater than or equal to image height!');
                }
            };

            fd.append('image', this.uploadForm.get('image').value);
        }

        // Checks whether required fields are empty
        let empty = !this.activity.name || !this.activity.description || !this.activity.organizer;

        let wrongCharacters = false;

        if (this.activity.canSubscribe) {
            // format form correctly
            const allDescriptions = [];
            const allTypes = [];
            const allOptions = [];
            const allRequired = [];
            const allPrivacyOfQuestion = [];

            this.inputs.forEach((dataObj) => {
                allDescriptions.push(dataObj.fullQuestion);
                allTypes.push(dataObj.type);
                let optionString = "";
                for (let i = 0; i < dataObj.options.length; i++) {
                    if (i !== 0) { optionString += "#;#"; }
                    optionString += dataObj.options[i].op;
                    if (dataObj.options[i].op.includes("#;#")) { wrongCharacters = true; }
                    if (dataObj.options[i].op.includes("#,#")) { wrongCharacters = true; }
                }

                allOptions.push(optionString);

                allRequired.push(dataObj.required.toString());

                allPrivacyOfQuestion.push(dataObj.privacyOfQuestion.toString());

                // Checks whether questions are empty
                if (!dataObj.fullQuestion || dataObj.fullQuestion === "") {
                    empty = true;
                }

                if (dataObj.fullQuestion.includes("#,#")) { wrongCharacters = true; }
                if (dataObj.fullQuestion.includes("#;#")) { wrongCharacters = true; }

                // Checks whether options of multiple choice questions are empty
                if (dataObj.type !== "☰ text" && dataObj.type !== "name" && dataObj.type !== "TU/e email") {
                    for (const option of dataObj.options) {
                        if (option.op === "" || !dataObj.options) { empty = true; }
                    }
                }
            });

            this.activity.typeOfQuestion = allTypes;
            this.activity.questionDescriptions = allDescriptions;
            this.activity.formOptions = allOptions;
            this.activity.required = allRequired;
            this.activity.privacyOfQuestions = allPrivacyOfQuestion;
            this.activity.numberOfQuestions = allDescriptions.length;
            this.activity.subscriptionDeadline = this.deadline.subscriptionDeadline;
        }

        // If required field are empty, do not accept activity
        if (empty) {
            return this.wrongInput("Not all required fields have been filled in.")
        }

        // If problematic fields contain #,# or #;# reject form
        if (wrongCharacters) {
            return this.wrongInput("Character combinations #,# and #;# are not allowed.")
        }

        if (this.activity.hasCoverImage && !changedCoverImage && !this.keepCurrent) {
            this.activity.hasCoverImage = false;
        }

        this.activitiesService.edit(this.activity, this.keepCurrent, fd).subscribe((result) => {
            this.loading = false;

            // redirect to edited activity
            window.location.href = "/activities/" + result.id + "#signup";
        });
    }
}
