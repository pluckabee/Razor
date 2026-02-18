Tasks

Initial Planning - Done
research the API - Done
Bootstrap the app using vite with react-ts - Done
Map out data model and types - Done
Map out components - Done
Map out Views and app states - Done
3 hrs

Create skeleton app with user journey and state manager (add React router) - Done
Create interface to call API layer - Done
Create interface to call local storage for user reviews - Done
4 hrs

Design screens and components
3 hrs

Build components - Done
4 hrs

Connect everything up - Done
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

Ended up going separate in interest of time and flexibility


# App structure

├─ src/
│  ├─ components/
│  ├─ hooks/
│  ├─ providers/
│  ├─ services/
│  ├─ types/
│  ├─ views/
│  ├─ App.tsx

## Components
The individual components that are used in the view files are here, each with ist own CSS file as appropriate

## Hooks
Hooks to manage searching and fetching the movies and our internal data reviews

## Providers
A Provider to access our internal data reviews which are currently in local storage. This layer would allow us to change this without sweeping changes across the app

## Services
A service to manage API calls to the external API services

## Types
Type definitions for external and internal data as well as some generic data structures

## Views
The main screens for the app


# Implementation notes
Search for your movie in the search bar and either hit enter or click submit. I made sure to use a form and to use a submit action to keep it accessible

A brief loader will show (if you want to look ata bit longer search for nonsense, I have added an artificial delay in this case)

The results are loaded in under the search bar. Hovering over each entry pulls the extra data from the API and then caches it in local storage to prevent too many API calls being sent unnecessarily. This fulfils the brief of showing actors and directors in the listing while taking performance into consideration

Clicking on a result opens the single title view which shows the full information of the film and has a card to show and edit your personal score, rating and review. I've tried to make the design of this a bit more fun than just some input fields although in doing so it is currently less accessible than it should be. This can be fixed while keeping the aesthetic

Note on rating: I added this as a bit of fun and these operate more like tags than as a score mapping (how do you rank so bad its good? You cant!) which is why they are separate

If you add a score to a movie, this will pull into the search view and show using the ticket graphic ive used across the app

The design is responsive and mobile first and should be intuitive to use

Typescript is used for type safety

Google material UI has been used with some custom styles


# Future considerations

## An account an associated views
I would have liked users to be able to have an authenticated account to have access to an account screen where a user would be able to easily see a list of all the movies they have reviewed

## Aggregate user scores
With a user base we could add aggregated community user scores to films along with your personal score and what gets pulled from the external API.

Along with this you could have full user reviews accessible to others, with an optional privacy flag on your reviews

## Database and API
Instead of local storage use a database and build an API to access our data. This has the benefit of being able to call and aggregate the external API data with our data at the service level, simplifying the UI layer and being able to precompile a static site if desired

## Testing
Of course testing would be added

## Storyblok
Components could have a storyblok to view and test in isolation

## Markdown
A markdown editor for reiews would be nice. These would also be stored separately from the score and rating as a larger piece of data and pulled in and reconciled in the service layer in a real application

## Other little bits and pieces
Being able to remove a score, rating or review
sorting and filtering of searches



