NEXT TODO STEP:
    [ ] adaptive design



FRONTEND:
    Admin Environment
        [x] Admin applications component:
            - [x]  Filter 
            - [x]  on page 
            - [x]  reset filters button 
            - [x]  pagination
        [ ] Admin application check user button
        [x] Admin Vacancies environment
            [x] Admin Vacancy. Add deactivate button. Think of the consequences.
            [x] Admin Vacancies. Filter layout (css) 
            [x] Admin Vacancies filter. Change some inputs to select (active, residence, sector) (complete but sector).
            [x] Admin Vacancy on_page shall be the same as for applications. 
            [x] Add number of Applications/Vacancies found (after the filter) 
            [x] Active value is not displayed in admin vacancies. 
            [x] In Admin Vacancies filter default value shall be Active. 
            [x] If staffUser goes to User Area he should not see All vacancies, but active. Add active to queryparam. 
            [x] Check that registered user can see deactevated vacancy he applied to. 
            [x] If vacancy is deactevated add div block to vacancy component.
        [ ] Admin settings. Posibble content: Active, onPage, sorting, columns for Applications and vacancies.
        [ ] Add users section. Add posibility to block user (tempporarily or parmanentely)
        [x] Add Partners page
            [x] list of partners [id , Company, HR Specialist, Phone,]
            [x] New Partner Form
            [x] Edit / Delete Partner
        [x] Vacancy shall be related to partner/company model
        [-] vacancy filter shall have a select input for company
        [-] vacancy filter shall have a select input for sector
        [x] admin side bar is shorter than context on the rigth. 
        [x] In admin area in side bar add a number of new applications. New applications in the list shall be bold.
    User Environment
        [x] user profile foto
            [x] Add userAvatarUrl to CustomObtainAuthToken backend
            [x] Handle UTF-8 Error
            [x] Read avatarUrl from localStorage
            [x] pass functionality from old Header Avatar to new AvatarComponent
            [x] Add Avatar component to User profile
            [x] Adjust size of Avatar in User profile
            [x] Avatar component title shall be optional
            [x] Add CRUD for Avatar image in User profile
            [x] limit Avatar input file to image types only
            [x] Check what would happen if picture is not rectangular (wide or high)
            [x] limit input file size (1mb)
            [ ] delete files from DB and from media
            [x] check min/max for photo resolution?
            [x] get rid of "No file chosen" sign next to input file buttons
        [x] for user add the possibility to add Vacancy to favorite list
        [x] list of favourite vacancies in user profile page.
        [x] bug on the homepage. Vacancy Details button leads to incorrect url.
        [x] Add User reviews
            [x] Reviews page consists of 8 last reviws, paginations, total number of rewies, average rating mark, button to leave a review.
            [x] user may leave only one review (Forein key)
            [?] if user have a review, Write-Review button diassapears. Find_My_Review button is awailable
            [x] Buttons edit and Delete are available on the users review.
            [x] Buttons are awailabe for registerd users only
            [?] Added admin check on review
            [x] Admin may delete any review
            [x] change Review Icon in Admin Area
            [x] In Admin Area Clients Reviews header has a different style, then Applications and Vacancies
            [x] Action on delete button review
        [x] commonElements.css Still needed?
        [x] footer and header shall habe width 100%
    CommonItems
        [x] Reviews.
            [x] Add Review model to backend. 
            [x] User Form to add Review.
            [x] Reviews section review pagination.
            [?] User profile section add My rewiws section or button
            [x] Add avarage rating to review page.
        [x] Think of default sorting order
        [x] think of todo handling
        [x] Rearchitecture the project.
        [+] Break components into smaller sub components
            [x] application ststus component
            [x] Button component
                [x] AdminApplicationComponent. Looks like I need two more props to add to ButtonType1: className and data-userData (data-status).
            [?] Input file button
            [?] X button (Close)
            [?] X button (Delete)
            [x] favourite Button
            [x] Pagination component
                [x] seperate generateListVacanciesRequestQueryString function (https://builtin.com/articles/urlsearchparams)
                [x] Pagination component shall use its own function paginationQueryString. Not generateListVacanciesRequestQueryString
                [x] Check if there is a possibility to simplify generateListVacanciesRequestQueryString function by using URLSearchParams methods.
        [x] switch from global css to module.css
        [x] Admin Applications. Change Status filter input to select.
        [?] Add Users section to Admin side bar
            [?] posibbility to block user permanentely or temporaryly
        [x] Add Reviews section to Admin side bar
        [x] rename Admin Environment to Admin Flow. User+
        [x] move AdminVacancyForm from assets
        [x] applicaption-filter-on-page-input shall be a separate component
        [x] think if 2 filter buttons should be a separate component
        [x] Adaptive design
        [ ] replace React.createRef() by useRef, similarily to AuthenticationComponent
                https://dev.to/carlosrafael22/      using-refs-in-react-functional-components-part-1-useref-callback-ref-2j5i


Emplamenting Role-based-authorisation
    [ ] create auth Context, provider and Hook
    [ ] combine Admin and User Router into one
    [ ] Create private router
    [ ] Add private router and auth to BroserRouter
    [ ] roles:
        Authenticated user:1150
        staff:2250
        admin:1001
    [ ] Add roles to backend user
    [ ] DO I need applications Route?



TO CONSIDER:
    [x] Adding Partners Model to DB.
        [x] Admin can select company only from awailabe list of partners
    [+] In admin area in side bar add a number of new applications. New applications in the list shall be bold.
    [?] Add a checkbox for each item in admin application list. Add tools panel for Action for checked applications:
        - Mark as read
        - Mark Approved
        - Mark Rejected
        - Mark Pending    
    [?] Add checkbox for Admin Vacancies list:
        - deactevate
        - delete (concequances)
    [ ] sending email to admin about new application or to user about application status change.
        




                


    














