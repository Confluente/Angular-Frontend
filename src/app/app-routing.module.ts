import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from "./core/pages/login/login.component";
import {HomeComponent} from "./core/pages/home/home.component";
import {AlumniComponent} from "./core/pages/about/alumni/alumni.component";
import {AssociationComponent} from "./core/pages/about/association/association.component";
import {CommitteesComponent} from "./core/pages/about/committees/committees.component";
import {BoardsComponent} from "./core/pages/about/boards/boards.component";
import {HRComponent} from "./core/pages/about/hr/hr.component";
import {HonorsAcademyComponent} from "./core/pages/education/honors-academy/honors-academy.component";
import {HonorsBachelorComponent} from "./core/pages/education/honors-bachelor/honors-bachelor.component";
import {HonorsMasterComponent} from "./core/pages/education/honors-master/honors-master.component";
import {StudentCouncilComponent} from "./core/pages/education/student-council/student-council.component";
import {ArtificialIntelligenceComponent} from "./core/pages/education/tracks/artificial-intelligence/artificial-intelligence.component";
import {CompetitiveProgrammingAndProblemSolvingComponent} from "./core/pages/education/tracks/competitive-programming-and-problem-solving/competitive-programming-and-problem-solving.component";
import {EmpowermentForHealthcareAndWellbeingComponent} from "./core/pages/education/tracks/empowerment-for-healthcare-and-wellbeing/empowerment-for-healthcare-and-wellbeing.component";
import {EnergyTransitionComponent} from "./core/pages/education/tracks/energy-transition/energy-transition.component";
import {HighTechSystemsComponent} from "./core/pages/education/tracks/high-tech-systems/high-tech-systems.component";
import {SensusComponent} from "./core/pages/education/tracks/sensus/sensus.component";
import {SmartCitiesComponent} from "./core/pages/education/tracks/smart-cities/smart-cities.component";
import {SmartMobilityComponent} from "./core/pages/education/tracks/smart-mobility/smart-mobility.component";
import {SisterAssociationsComponent} from "./core/pages/partners/sister-associations/sister-associations.component";
import {SponsorsComponent} from "./core/pages/partners/sponsors/sponsors.component";
import {DnbComponent} from "./core/pages/partners/sponsors/dnb/dnb.component";
import {ActivityOverviewComponent} from "./core/templates/activities/activity-overview/activity-overview.component";
import {AllActivitiesResolverService} from "./core/services/activities/all-activities-resolver.service";
import {ActivityDetailsComponent} from "./core/templates/activities/activity-details/activity-details.component";
import {SpecificActivityResolverService} from "./core/services/activities/specific-activity-resolver.service";
import {ManageComponent} from "./core/pages/manage/manage.component";
import {ActivityCreateComponent} from "./core/templates/activities/activity-create/activity-create.component";
import {ActivityEditComponent} from "./core/templates/activities/activity-edit/activity-edit.component";
import {AllActivitiesManageResolverService} from "./core/services/activities/all-activities-manage-resolver.service";
import {AllUsersResolverService} from "./core/services/users/all-users-resolver.service";
import {AllGroupsResolverService} from "./core/services/groups/all-groups-resolver.service";
import {UserDetailsComponent} from "./core/templates/users/user-details/user-details.component";
import {UserCreateComponent} from "./core/templates/users/user-create/user-create.component";
import {UserEditComponent} from "./core/templates/users/user-edit/user-edit.component";
import {SpecificUserResolverService} from "./core/services/users/specific-user-resolver.service";
import {GroupCreateComponent} from "./core/templates/groups/group-create/group-create.component";
import {GroupEditComponent} from "./core/templates/groups/group-edit/group-edit.component";
import {GroupDetailsComponent} from "./core/templates/groups/group-details/group-details.component";
import {SpecificGroupResolverService} from "./core/services/groups/specific-group-resolver.service";
import {PrivacyPolicyComponent} from "./core/pages/privacy-policy/privacy-policy.component";
import {MagazineComponent} from "./core/pages/magazine/magazine.component";
import {ForbiddenComponent} from "./core/pages/error_pages/forbidden/forbidden.component";
import {NotFoundComponent} from "./core/pages/error_pages/not-found/not-found.component";
import {ConsentPortraitRightComponent} from "./core/pages/consent-portrait-right/consent-portrait-right.component";
import {SubmittedRegistrationComponent} from "./core/pages/submitted-registration/submitted-registration.component";
import {CompletedRegistrationComponent} from "./core/pages/completed-registration/completed-registration.component";
import {CommitteesResolverService} from "./core/services/groups/committees-resolver.service";
import {ChangePasswordComponent} from "./core/templates/users/change-password/change-password.component";
import {CompanyOpportunityOverviewComponent} from "./core/templates/partners/company-opportunity-overview/company-opportunity-overview.component";
import {AllCompanyOpportunitiesResolverService} from "./core/services/partners/all-company-opportunities-resolver.service";
import {CompanyOpportunityDetailsComponent} from "./core/templates/partners/company-opportunity-details/company-opportunity-details.component";
import {SpecificCompanyOpportunityResolverService} from "./core/services/partners/specific-company-opportunity-resolver.service";
import {CompanyOpportunityCreateComponent} from "./core/templates/partners/company-opportunity-create/company-opportunity-create.component";
import {CompanyOpportunityEditComponent} from "./core/templates/partners/company-opportunity-edit/company-opportunity-edit.component";
import {CurrentUserResolverService} from "./core/services/users/current-user-resolver.service";
import {BaseComponent} from "./core/base/base.component";
import {OptiverComponent} from "./core/pages/partners/sponsors/optiver/optiver.component";

import {RiddleComponent} from "./core/pages/candi-riddle/riddle/riddle.component";
import {RiddleComponent1} from "./core/pages/candi-riddle/riddle1/riddle1.component";
import {RiddleComponent2} from "./core/pages/candi-riddle/riddle2/riddle2.component";

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {
        path: '',
        component: BaseComponent,
        resolve: {
            currentUser: CurrentUserResolverService
        },
        children: [
            {path: 'home', component: HomeComponent},
            {path: 'login', component: LoginComponent},
            {
                path: 'manage',
                component: ManageComponent,
                resolve: {
                    allActivities: AllActivitiesManageResolverService,
                    allUsers: AllUsersResolverService,
                    allGroups: AllGroupsResolverService,
                    allCompanyOpportunities: AllCompanyOpportunitiesResolverService,
                    currentUser: CurrentUserResolverService
                }
            },

            // Activities
            {
                path: 'activities_overview',
                component: ActivityOverviewComponent,
                resolve: {activities: AllActivitiesResolverService}
            },
            {
                path: 'activities/:activityId',
                component: ActivityDetailsComponent,
                resolve: {
                    activity: SpecificActivityResolverService,
                }
            },
            {path: 'manage/activities/create', component: ActivityCreateComponent,
                resolve: {allGroups: AllGroupsResolverService}
            },
            {
                path: 'manage/activities/edit/:activityId',
                component: ActivityEditComponent,
                resolve: {
                    activity: SpecificActivityResolverService,
                    allGroups: AllGroupsResolverService
                }
            },

            // Users
            {path: 'user/profile', component: UserDetailsComponent},
            {path: 'user/:userId', component: UserDetailsComponent, resolve: {user: SpecificUserResolverService}},
            {path: 'register_new_member', component: UserCreateComponent},
            {
                path: 'manage/users/edit/:userId',
                component: UserEditComponent,
                resolve: {
                    user: SpecificUserResolverService,
                    allGroups: AllGroupsResolverService
                }
            },
            {
                path: 'manage/users/change_password/:userId',
                component: ChangePasswordComponent,
                resolve: {user: SpecificUserResolverService}
            },

            // Groups
            {path: 'manage/groups/create', component: GroupCreateComponent},
            {
                path: 'manage/groups/edit/:groupId',
                component: GroupEditComponent,
                resolve: {
                    group: SpecificGroupResolverService,
                    allUsers: AllUsersResolverService,
                }
            },
            {path: 'group/:groupId', component: GroupDetailsComponent, resolve: {group: SpecificGroupResolverService}},

            // Company Opportunities
            {
                path: 'partners/company_opportunities',
                component: CompanyOpportunityOverviewComponent,
                resolve: {
                    allCompanyOpportunity: AllCompanyOpportunitiesResolverService
                }
            },
            {
                path: 'partners/company_opportunities/:companyOpportunityId',
                component: CompanyOpportunityDetailsComponent,
                resolve: {companyOpportunity: SpecificCompanyOpportunityResolverService}
            },
            {path: 'manage/partners/company_opportunities/create', component: CompanyOpportunityCreateComponent},
            {
                path: 'manage/partners/company_opportunities/edit/:companyOpportunityId',
                component: CompanyOpportunityEditComponent,
                resolve: {companyOpportunity: SpecificCompanyOpportunityResolverService}
            },

            // Pages
            {path: 'about/alumni', component: AlumniComponent},
            {path: 'about/association', component: AssociationComponent},
            {
                path: 'about/committees',
                component: CommitteesComponent,
                resolve: {committees: CommitteesResolverService}
            },
            {path: 'about/boards', component: BoardsComponent},
            {path: 'about/HR', component: HRComponent},
            {path: 'education/honors_academy', component: HonorsAcademyComponent},
            {path: 'education/honors_bachelor', component: HonorsBachelorComponent},
            {path: 'education/honors_master', component: HonorsMasterComponent},
            {path: 'education/student_council', component: StudentCouncilComponent},
            {path: 'education/tracks/artificial_intelligence', component: ArtificialIntelligenceComponent},
            {
                path: 'education/tracks/competitive_programming_and_problem_solving',
                component: CompetitiveProgrammingAndProblemSolvingComponent
            },
            {
                path: 'education/tracks/empowerment_for_healthcare_and_wellbeing',
                component: EmpowermentForHealthcareAndWellbeingComponent
            },
            {path: 'education/tracks/energy_transition', component: EnergyTransitionComponent},
            {path: 'education/tracks/high_tech_systems', component: HighTechSystemsComponent},
            {path: 'education/tracks/sensus', component: SensusComponent},
            {path: 'education/tracks/smart_cities', component: SmartCitiesComponent},
            {path: 'education/tracks/smart_mobility', component: SmartMobilityComponent},
            {path: 'partners/sister_associations', component: SisterAssociationsComponent},
            {path: 'partners/sponsors', component: SponsorsComponent},
            {path: 'partners/sponsors/dnb', component: DnbComponent},
            {path: 'partners/sponsors/optiver', component: OptiverComponent},
            {path: 'privacy_policy', component: PrivacyPolicyComponent},
            {path: 'magazine', component: MagazineComponent},
            {path: 'consent_portrait_right', component: ConsentPortraitRightComponent},
            {path: 'submitted_registration', component: SubmittedRegistrationComponent},
            {path: 'completed_registration', component: CompletedRegistrationComponent},
			
			//Digital-RiddleCandi page
            {path: 'RiddleAnswerARiddleAnswerB', component: RiddleComponent},
			{path: 'TopThree', component: RiddleComponent1},
			{path: 'oTpTrehe', component: RiddleComponent2},
            

            // Error pages
            {path: '403', component: ForbiddenComponent},
            {path: '404', component: NotFoundComponent},
            {path: '**', redirectTo: '/home', pathMatch: 'full'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {paramsInheritanceStrategy: 'always'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
