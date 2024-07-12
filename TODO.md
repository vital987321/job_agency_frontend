NEXT TODO STEP:
 



BACKEND:
    [ ] Vacancies Environment
        [x] Expand Vacancy Filter for Staff
        [x] For Vacancy model add Add active and inactive status.
        [x] Vacancy component does not show deactivated vacancy (single vacancy) in admin area.
            probably similar isue for user area. Check VacancyListDjangoFilterBackend
    [ ] permitions to admin environment
    [ ] Admin can see only his own applications. Fix it.
    [ ] Permissions
        [ ]

    
    
    

FRONTEND:
    [x] Admin applications component:
        - [x]  Filter 
        - [x]  on page 
        - [x]  reset filters button 
        - [x]  pagination 
    [ ] user profile foto
    [ ] Admin application check user button
    [ ] Reviews. User writes a review, admin Approves or rejects the review.
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
    [ ] Think of sorting order (default and setup).
    [x] think of todo handling
    [ ] for user add the possibility to add Vacancy to favorite list
    
    
    
TO CONSIDER:
    [ ] Adding Partners Model to DB.
        [ ] Admin can select company only from awailabe list of partners
    [ ] In admin area in side bar add a number of new applications. New applications in the list shall be bold.
    [ ] Add a checkbox for each item in admin application list. Add tools panel for Action for checked applications:
        - Mark as read
        - Mark Approved
        - Mark Rejected
        - Mark Pending    
    [ ] Add checkbox for Admin Vacancies list:
        - deactevate
        - delete (concequances)
        



















