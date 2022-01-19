/*
4. Design and write a dispatching service for a small Police Station. The station has 4 teams, each  with a car. The Service will receive a notification when an incoming call occurs, with each call having a  priority assigned of Low, Medium, or High. The service will also receive a notification when a team  has returned from a call.
- The service should assign/dispatch a specific team for each incoming call 
- If there are more calls than teams available, the calls should be queued until a team returns. 
- Queued calls should be filled in priority order first, if multiple calls exist with the same priority the  oldest call should be handled first. 
- The team that should be dispatched is the one with the longest idle time. 
- One team should always remain at the station unless a call needs handling with a priority level of  High. 
*/
class DispatchService {
	constructor(teamNames = ['Team A', 'Team B', 'Team C', 'Team D']) {
		this.teamsAvail = teamNames;
		this.callsQueue = new CallsQueue();
		this.callsInProgress = [];
	}

	// Dispatch a team depending on the call's priority,
	// number of teams available, and the queue of calls.
	// Returns true if a team was dispatched,
	// false if the call is added to the queue.
	dispatchTeam(call) {

		// Add to queue if no teams available
		if (this.teamsAvail.length == 0) {
			this.callsQueue.enqueue(call);
			return false;
		}

		// Only dispatch a team if there is no queue,
		// more than 1 team available,
		// or if it qualifies to dispatch the last team
		if (this.callsQueue.isEmpty() || this.shouldDispatchLast(call) || this.teamsAvail.length > 1) {

			// Dispatch the team that was farthest from returning from a call
			call.teamResponding = this.teamsAvail.shift();
			this.callsInProgress.push(call);
			return true;
		}
	}

	// Update the calls in progress
	// and attempt to dispatch a team now that another team is available.	
	teamReturned(call) {
		this.teamsAvail.push(call.teamResponding);
		const index = this.callsInProgress.indexOf(call);
		if (index > -1) {
			this.callsInProgress.splice(index, 1);
		}

		// Dispatch a team since one just returned
		if (!this.callsQueue.isEmpty()) {
			if (this.dispatchTeam(this.callsQueue.head())) {

				// Update call queue if team has dispatched
				this.callsQueue.dequeue();
			}
		}
	}

	// Check if input "call" requires last team to dispatch
	shouldDispatchLast(call) {
		return (this.teamsAvail.length == 1 && call.priority == 3)
	}
}


/*
This class is tasked with keeping the priority of calls
in order from Highest first to Lowest,
with any priority ties oldest calls are processed first .

*/
class CallsQueue {
	constructor() {
		this.calls = [];
	}

	// Inserts calls where they belong comparing their priority with other calls
	enqueue(call) { 
		let contain = false;
		for (let i = 0; i < this.calls.length; i++) {
			if (call.priority > this.calls[i].priority) {
				this.calls.splice(i, 0, call);
				contain = true;
				break;
			}
		}

		if (!contain) {
			this.calls.push(call);
		}
	}

	// Removes the highest priority, oldest call
	dequeue() {
		if (this.isEmpty()) {
			return "No calls";
		}
		return this.calls.shift();
	}

	isEmpty() {
		return this.calls.length == 0;
	}

	// Returns first call in priority queue
	head() {
		if (this.isEmpty()) {
			return null;
		}
		return this.calls[0];
	}
}

// Maps priority to numerical value for priority queue to compare priorities
class Call {
	constructor(request, priority) {
		let priorityMap = {"Low" : 1, "Medium" : 2, "High": 3}
		this.request = request;
		this.priority = priorityMap[priority];
		this.teamResponding = null;
	}
}
