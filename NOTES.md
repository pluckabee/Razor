Tasks

Initial Planning
research the API
Bootstrap the app using vite with react-ts 
Map out data model and types
Map out components
Map out Views and app states
3 hrs

Create skeleton app with user journey and state manager (add React router)
Create interface to call API layer
Create interface to call local storage for user reviews
2 hrs

Design screens and components
2 hrs

Build components
4 hrs

Connect everything up
1hr

Test
1hr

Document next steps

Views
    - Search
    - Single film
    - User Account


View States

Search View
    - Empty state
    - typing in a search
        - No previous results
        - With previous results
    - Searching
        - No previous results
        - With previous results
    - Search return
        - Results
        - No results

Movie View
    - No review
    - Has Review
    - Adding Review
    - Review Added
    - Review Failed to add

User View
User Details
User Reviews 

Components
    Search Bar
    Results List
    Movie Details
    Review Form
    User Details
    Review Details
    
Think about: 
Filters and sorting
Markdown Editor?
Movie ratings
Where to store and how to unify user ratings

Data model notes:
How to model the user score options:
Could add to existing Ratings Array with a new source being this app
Pros:
Can manage existing movie ratings and our ratings in a nice consistent way, no need for an extra type interface.
Can reconcile the two sources at the API interface level keeping component code clean
Cons:
Could be confusing adding data to an external record

Could add an extra property to the movie 
Pros: 
Manage only a single record, easy to find our new property
Can reconcile the two sources at the API interface level keeping component code clean
Cons: Managing two type objects that are virtually the same can be cumbersome. Potential future conflict if external data model ever changes

Keep the objects entirely separate
Pros: Nice and clean, never going to be confusing. More flexible, can use the user rating model in more places in the future
Cons: Reconciling two sources at a level up from the API layer is harder to manage

App structure

├─ src/
│  ├─ assets/
│  ├─ services/
│  ├─ hooks/
│  ├─ components/
│  ├─ types/
│  ├─ App.tsx