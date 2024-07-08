NEXT STEP:
Admin Vacancy on_page shall be the same as for applications.

in backend side:
    Expand Vacancy Filter for Staff (complete)
    permitions to admin environment
    Admin can see only his own applications. Fix it.
    For Vacancy model add Add active and inactive status.
    

Frontend:
    Admin applications component:
        - Filter (complete)
        - on page (complete)
        - reset filters button (complete)
        - pagination (complete)
    user profile foto
    Admin application check user button
    user. Write a review
    Admin. Approve or reject review
    Admin Vacancy. Add deactivate button. Think of the consequences.
    Admin Vacancy. Show information if deactevated.
    Admin Vacancies. Filter layout (css) (complete)
    Admin Vacancies filter. Change some inputs to select (active, residence, sector) (complete but sector).
    Admin Vacancy on_page shall be the same as for applications.
    Add number of Applications/Vacancies found (after the filter) (complete)

    
    
    

Think about:
    Adding Partners Model to DB.
        Admin can select company only from awailabe list of partners
    In admin area in side bar add a number of new applications. New applications in the list sall be bold.
    Add a checkbox for each item in admin application list. Add tools panel for Action for checked applications:
        - Mark as read
        - Mark Approved
        - Mark Rejected
        - Mark Pending
    for user add possibility to add Vacancied to favorite list
    Add checkbox for Admin Vacancies list:
        - deactevate
        - delete (concequances)
        


Admin Application Filter:
    +   application id
    +   Vacancy id
    +   vacancy name
    +   company
    +   user_id
    +   first_name
    +   last_name
    +   userEmail
    +   userPhone
    +   status


DEACTEVATED VACANCY
beckend environment:
1. Add to model "active" field. Default=true blank=false null=false

User environment:
1. User requests shall return only active vacancies to the list
2. User can see deactivated vacancy only though his own applications. Additional record appears showing that vacancy is deactivated.

Admin Environment:
1. Admin's request returns active vacancies by default, unless filtered Diactivated
2. Admin vacancy component has 1 button "activate/deactivate"



Admin Vacancy Filter:
Vacancy ID
Vacancy name
salary min
salary max
company
sector
residance type
location
Active











