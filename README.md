# Screening Questions
I used `node <javascript file name>` in a terminal to run each of the Javascript files.
## 1. Loan Amortization Table
The function named `loanTable` writes an amortization table into an excel file to view and manipulate. It will  takes in arguments `yearInt` as the decimal value for the interest rate (for **3%**, enter `0.03`), `principal` for the initial loan (example uses **$200,000**), `numYears` as the number of years for lifetime of loan to calculate the **monthly payment**, **interest payment**, and **principal payment**.

The two given examples for amortization table arguments are written to files `3% Interest and 30 Years.xlsx` and `2.5% Interest and 20 Years.xlsx` where they can be corrected for errors if any and compared to each other.

This function requires the `xlsx` library to create the excel files. My environment used version `xlsx=0.17.5` which can be installed with `npm i xlsx`.

## 2. Possible words from string input 

The function named `wordsFromString` keeps track of the number of occurrences for each letter from the string `input` and checks each word from the array of `words` if it uses more letters than allowed from `input`. Only an array of qualified words is returned.

## 3. Visited Pages

I used a `set` to store the URLs of visited pages since the time to check if a URL is in the set is constant time and the time to add a URL to the `set` is also very fast.

I simply use the `has` function from a `set` to check for a visited URL and `add` function to append the URL to the list of visited pages. The `add` function checks if it already has the URL stored in its `visited` array.

## 4. Dispatching Service

The class `Call` keeps track of the `request` for a team, level of `priority`, and the `teamResponding` for the call. `teamResponding` will be `null` if no team is dispatched for it.

The class `CallsQueue` implements a priority queue using an array `calls` to store the calls requested. The `enqueue` function adds a call in order of priority, highest to lowest, and for any priority ties, oldest calls are processed first. The `dequeue` function removes the first call from `calls` if it is not empty. `head` returns first call from `calls` and `isEmpty` simply returns `true` if `calls` is empty and `false` otherwise.

### DispatchService Class
The class `DispatchService` keeps a list of teams available for dispatch, `teamsAvail`, a priority queue of calls, `callsQueue`, and array of calls in progress with teams assigned, `callsInProgress`.

The `dispatchTeam` accepts a parameter `call` of type `Call` and will first check if there is any team available. If not, then the call will be inserted into the queue.

If there is only one team available but it satisfies the `shouldDispatchLast` condition where the priority for the call is `High`, then dispatch the last team for that call. Or if there are more than 1 team or there are no calls in `callsQueue`, then dispatch the most idled team, first team in `teamsAvail` array.

When a team is returned from a `call`, then that team is now available and would need to check if a team can be dispatched for a call in `callsQueue` if any. If a team has been dispatched for a call from `callsQueue`, update the queue by removing that call.
