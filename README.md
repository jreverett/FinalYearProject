# Upvent [![Build Status](https://dev.azure.com/jamieeverett0462/PRCO304-Upvent/_apis/build/status/jreverett.FinalYearProject?branchName=master)](https://dev.azure.com/jamieeverett0462/PRCO304-Upvent/_build/latest?definitionId=6&branchName=master)

_Repository for final year project_

<ins>Prerequisites:</ins>
To run the source code locally, Node.js is required (the latest version should work).

Then, clone the project’s GitHub repository.

As the project uses MongoDB Atlas as its database, you are required to create a collection, or alternatively run a local version of MongoDB. Either way, create a new collection and record the connection string, which will be in the format:

<pre>mongodb://[username:password@host1[:port1][…hostN[:portN]]/[defaultauthdb][?options]]</pre>

for a MongoDB Altas connection, or:

<pre>mongodb://username:password@localhost</pre>

for a local database.

<ins>Initialising the Project:</ins>
Navigate to the root of the project in a terminal and run the command **npm install** (or **npm i**) to install dependencies.

Then, run the command **cd client** to go to the client folder and run **npm install** again.

Finally, return to the root directory by running '**cd ..**'.

<ins>Running the Project:</ins>

Execute the command **npm run dev** to concurrently launch both the client and server. Upvent should open automatically in your default browser, but if it doesn’t head to localhost:9000 in your browser.

When the project is running successfully, the terminal should look something like this:

![Upvent running in terminal](/docs/images/running-dev-terminal.png)

To run the tests locally, run **npm test** (also from the root directory).
