import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './core/snippets/footer/footer.component';
import {HeaderComponent} from './core/snippets/header/header.component';

import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import { LoginComponent } from './core/pages/login/login.component';
import { HomeComponent } from './core/pages/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AlumniComponent } from './core/pages/about/alumni/alumni.component';
import { AssociationComponent } from './core/pages/about/association/association.component';
import { CommitteesComponent } from './core/pages/about/committees/committees.component';
import { BoardsComponent } from './core/pages/about/boards/boards.component';
import { HRComponent } from './core/pages/about/hr/hr.component';
import { HonorsAcademyComponent } from './core/pages/education/honors-academy/honors-academy.component';
import { HonorsBachelorComponent } from './core/pages/education/honors-bachelor/honors-bachelor.component';
import { HonorsMasterComponent } from './core/pages/education/honors-master/honors-master.component';
import { StudentCouncilComponent } from './core/pages/education/student-council/student-council.component';
import { MenuTracksComponent } from './core/snippets/menu-tracks/menu-tracks.component';
import { ArtificialIntelligenceComponent } from './core/pages/education/tracks/artificial-intelligence/artificial-intelligence.component';
import { CompetitiveProgrammingAndProblemSolvingComponent } from './core/pages/education/tracks/competitive-programming-and-problem-solving/competitive-programming-and-problem-solving.component';
import { EmpowermentForHealthcareAndWellbeingComponent } from './core/pages/education/tracks/empowerment-for-healthcare-and-wellbeing/empowerment-for-healthcare-and-wellbeing.component';
import { EnergyTransitionComponent } from './core/pages/education/tracks/energy-transition/energy-transition.component';
import { HighTechSystemsComponent } from './core/pages/education/tracks/high-tech-systems/high-tech-systems.component';
import { SensusComponent } from './core/pages/education/tracks/sensus/sensus.component';
import { SmartCitiesComponent } from './core/pages/education/tracks/smart-cities/smart-cities.component';
import { SmartMobilityComponent } from './core/pages/education/tracks/smart-mobility/smart-mobility.component';
import { SisterAssociationsComponent } from './core/pages/partners/sister-associations/sister-associations.component';
import { SponsorsComponent } from './core/pages/partners/sponsors/sponsors.component';
import { DnbComponent } from './core/pages/partners/sponsors/dnb/dnb.component';
import { ActivityOverviewComponent } from './core/templates/activities/activity-overview/activity-overview.component';
import { ActivityDetailsComponent } from './core/templates/activities/activity-details/activity-details.component';
import { ManageComponent } from './core/pages/manage/manage.component';
import { ActivityCreateComponent } from './core/templates/activities/activity-create/activity-create.component';
import { ActivityEditComponent } from './core/templates/activities/activity-edit/activity-edit.component';
import { UserDetailsComponent } from './core/templates/users/user-details/user-details.component';
import {AuthResolverService} from "./core/services/users/auth-resolver.service";
import { UserCreateComponent } from './core/templates/users/user-create/user-create.component';
import { UserEditComponent } from './core/templates/users/user-edit/user-edit.component';
import { GroupCreateComponent } from './core/templates/groups/group-create/group-create.component';
import { GroupEditComponent } from './core/templates/groups/group-edit/group-edit.component';
import { GroupDetailsComponent } from './core/templates/groups/group-details/group-details.component';
import { PrivacyPolicyComponent } from './core/pages/privacy-policy/privacy-policy.component';
import { MagazineComponent } from './core/pages/magazine/magazine.component';
import { ForbiddenComponent } from './core/pages/error_pages/forbidden/forbidden.component';
import { NotFoundComponent } from './core/pages/error_pages/not-found/not-found.component';
import { ConsentPortraitRightComponent } from './core/pages/consent-portrait-right/consent-portrait-right.component';
import { SubmittedRegistrationComponent } from './core/pages/submitted-registration/submitted-registration.component';
import { CompletedRegistrationComponent } from './core/pages/completed-registration/completed-registration.component';
import { UserDeleteComponent } from './core/templates/users/user-delete/user-delete.component';
import { GroupDeleteComponent } from './core/templates/groups/group-delete/group-delete.component';
import { ActivityDeleteComponent } from './core/templates/activities/activity-delete/activity-delete.component';
import { ChangePasswordComponent } from './core/templates/users/change-password/change-password.component';
import { InternshipCreateComponent } from './core/templates/partners/internships/internship-create/internship-create.component';
import { InternshipEditComponent } from './core/templates/partners/internships/internship-edit/internship-edit.component';
import { InternshipDetailsComponent } from './core/templates/partners/internships/internship-details/internship-details.component';
import { InternshipDeleteComponent } from './core/templates/partners/internships/internship-delete/internship-delete.component';
import { InternshipOverviewComponent } from './core/templates/partners/internships/internship-overview/internship-overview.component';
import { FilterPipe } from './core/pipes/filter.pipe';
import { SortPipe } from './core/pipes/sort.pipe';
import { MarkdownComponent } from './core/snippets/markdown/markdown.component';
import { BaseComponent } from './core/base/base.component';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        LoginComponent,
        HomeComponent,
        AlumniComponent,
        AssociationComponent,
        CommitteesComponent,
        BoardsComponent,
        HRComponent,
        HonorsAcademyComponent,
        HonorsBachelorComponent,
        HonorsMasterComponent,
        StudentCouncilComponent,
        MenuTracksComponent,
        ArtificialIntelligenceComponent,
        CompetitiveProgrammingAndProblemSolvingComponent,
        EmpowermentForHealthcareAndWellbeingComponent,
        EnergyTransitionComponent,
        HighTechSystemsComponent,
        SensusComponent,
        SmartCitiesComponent,
        SmartMobilityComponent,
        SisterAssociationsComponent,
        SponsorsComponent,
        DnbComponent,
        ActivityOverviewComponent,
        ActivityDetailsComponent,
        ManageComponent,
        ActivityCreateComponent,
        ActivityEditComponent,
        UserDetailsComponent,
        UserCreateComponent,
        UserEditComponent,
        GroupCreateComponent,
        GroupEditComponent,
        GroupDetailsComponent,
        PrivacyPolicyComponent,
        MagazineComponent,
        ForbiddenComponent,
        NotFoundComponent,
        ConsentPortraitRightComponent,
        SubmittedRegistrationComponent,
        CompletedRegistrationComponent,
        UserDeleteComponent,
        GroupDeleteComponent,
        ActivityDeleteComponent,
        ChangePasswordComponent,
        InternshipCreateComponent,
        InternshipEditComponent,
        InternshipDetailsComponent,
        InternshipDeleteComponent,
        InternshipOverviewComponent,
        FilterPipe,
        SortPipe,
        MarkdownComponent,
        BaseComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        CookieService,
        AuthResolverService,
        FilterPipe,
        SortPipe
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
