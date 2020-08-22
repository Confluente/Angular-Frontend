import {Component, OnInit} from '@angular/core';
import {ActivitiesService} from "../../../services/activities/activities.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from '@angular/forms';
import {DatePipe} from "@angular/common";
import {FilterPipe} from "../../../pipes/filter.pipe";

@Component({
    selector: 'app-activity-create',
    templateUrl: './activity-create.component.html',
    providers: [DatePipe],
    styleUrls: ['./activity-create.component.css']
})
export class ActivityCreateComponent implements OnInit {

    loading = false;

    uploadForm: FormGroup;

    // setting standard deadline for subscription deadline field
    deadline = {
        subscriptionDeadline: this.datePipe.transform(new Date(), "yyyy-MM-dd")
    };

    // setting standard inputs for subscription form (first two questions are mandatory)
    inputs = [
        {fullQuestion: 'Name', type: "name", options: [''], required: 'true', privacyOfQuestion: 'false'},
        {fullQuestion: 'TU/e email', type: "TU/e email", options: [''], required: 'true', privacyOfQuestion: 'false'}
    ];

    // declaring variables in used in form;
    canSubscribe = false;
    name: string;
    description: string;
    organizer: string;
    date = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    startTime: string;
    endTime: string;
    location: string;
    participationFee: string;
    published: boolean;
    hasCoverImage: any;
    image: any;

    // options for question types
    types = ["☰ text", "◉ multiple choice", "☑ checkboxes"];

    datepicker = {open: false};

    private empty: boolean;
    private wrongCharacters: boolean;
    user: any;

    constructor(private activitiesService: ActivitiesService,
                private activatedRoute: ActivatedRoute,
                private formBuilder: FormBuilder,
                private datePipe: DatePipe,
                private filterPipe: FilterPipe) {
        this.loading = true;

        this.uploadForm = this.formBuilder.group({
            image: 'No Image'
        });
    }

    ngOnInit(): void {
        this.user = this.activatedRoute.snapshot.data.currentUser;

        this.loading = false;
    }

    // Each time a question is added, this creates a new empty object in the inputs variable
    add() {
        const dataObj = {fullQuestion: '', type: "☰ text", options: ['option 1'], required: '', privacyOfQuestion: ''};
        this.inputs.push(dataObj);
    }

    // Removes specific question
    removeInput(index) {
        if (index > 1 && index < this.inputs.length) {
            this.inputs.splice(index, 1);
        }
    }

    // Adds option for multiple choice questions
    addOption(input) {
        const option = 'option ' + (input.options.length + 1).toString();
        input.options.push(option);
    }

    // Remove specific option from a multiple choice question
    removeOption(inputIndex, optionIndex) {
        this.inputs[inputIndex].options.splice(optionIndex, 1);
    }

    // Function to toggle the canSubscribe variable
    toggleSubscribe() {
        this.canSubscribe = !this.canSubscribe;
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

    // function called when a new activity is submitted
    submit() {
        this.loading = true;

        let hasCoverImage = false;
        if (this.uploadForm.get('image').value !== 'No Image') {
            hasCoverImage = true;
        }

        const fd = new FormData();
        if (hasCoverImage) {
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

        // constructing standard activity object
        const act = {
            name: this.name,
            description: this.description,
            organizer: this.organizer,
            date: this.date,
            startTime: this.startTime,
            endTime: this.endTime,
            location: this.location,
            participationFee: this.participationFee,
            published: this.published,
            canSubscribe: this.canSubscribe,
            hasCoverImage,
            numberOfQuestions: undefined,
            typeOfQuestion: undefined,
            questionDescriptions: undefined,
            options: undefined,
            required: undefined,
            privacyOfQuestions: undefined,
            subscriptionDeadline: undefined
        };

        // Checking required fields
        this.empty = !this.name || !this.description || !this.organizer;
        this.wrongCharacters = false;

        // Adding form to activity object if members can subscribe
        if (this.canSubscribe) {
            // Format output correctly
            const allDescriptions = [];
            const allTypes = [];
            const allOptions = [];
            const allRequired = [];
            const allPrivacyOfQuestion = [];

            this.inputs.forEach((dataObj) => {
                allDescriptions.push(dataObj.fullQuestion);
                allTypes.push(dataObj.type);

                // SQlite database can't handle strings therefore lists are stored as , seperated lists
                // and ; seperated lists
                let optionString = dataObj.options[0];
                for (let i = 1; i < dataObj.options.length; i++) {
                    optionString += "#;#" + dataObj.options[i];
                    if (dataObj.options[i].includes("#;#")) {
                        this.wrongCharacters = true;
                    }
                    if (dataObj.options[i].includes("#,#")) {
                        this.wrongCharacters = true;
                    }
                }
                allOptions.push(optionString);

                allRequired.push(dataObj.required);

                allPrivacyOfQuestion.push(dataObj.privacyOfQuestion);

                // check whether the question actually has a question
                if (!dataObj.fullQuestion || dataObj.fullQuestion === "") {
                    this.empty = true;
                }

                if (dataObj.fullQuestion.includes("#,#")) {
                    this.wrongCharacters = true;
                }
                if (dataObj.fullQuestion.includes("#;#")) {
                    this.wrongCharacters = true;
                }

                // Check whether choices of multiple choice questions are empty
                if (dataObj.type !== "☰ text" && dataObj.type !== "name" && dataObj.type !== "TU/e email") {
                    for (const option of dataObj.options) {
                        if (option === "" || !dataObj.options) {
                            this.empty = true;
                        }
                    }
                }
            });

            act.numberOfQuestions = allDescriptions.length;
            act.typeOfQuestion = allTypes;
            act.questionDescriptions = allDescriptions;
            act.options = allOptions;
            act.required = allRequired;
            act.privacyOfQuestions = allPrivacyOfQuestion;
            act.subscriptionDeadline = this.deadline.subscriptionDeadline;
        }

        // If any required field is empty than do not accept the activity
        if (this.empty) {
            return this.wrongInput("Not all required fields have been filled in.");
        }

        if (this.wrongCharacters) {
            return this.wrongInput("Character combinations #,# and #;# are not allowed.");
        }

        // create new activity from variables as put on the $scope by the form
        this.activitiesService.create(fd, act).subscribe((activity: any) => {
            this.loading = false;

            // redirect to new activity
            window.location.href = "/activities/" + activity.id + "#signup";
        });
    }
}
