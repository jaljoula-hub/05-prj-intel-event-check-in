// Intel Sustainability Summit Check-In App
// Includes all required features + Level Up extra credit

// -----------------------------------
// 1. Get elements from the HTML
// -----------------------------------
const checkInForm = document.getElementById("checkInForm");
const attendeeName = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");

const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

const waterCount = document.getElementById("waterCount");
const zeroCount = document.getElementById("zeroCount");
const powerCount = document.getElementById("powerCount");

// -----------------------------------
// 2. Attendance goal
// -----------------------------------
const attendanceGoal = 50;

// -----------------------------------
// 3. Load saved data from localStorage
// -----------------------------------
let totalAttendees =
  Number(localStorage.getItem("totalAttendees")) || 0;

let waterTeam =
  Number(localStorage.getItem("waterTeam")) || 0;

let zeroTeam =
  Number(localStorage.getItem("zeroTeam")) || 0;

let powerTeam =
  Number(localStorage.getItem("powerTeam")) || 0;

// Load attendee list or start with an empty array
let attendees =
  JSON.parse(localStorage.getItem("attendees")) || [];

// -----------------------------------
// LEVEL UP: Create Attendee List
// entirely with JavaScript
// -----------------------------------
const attendeeSection = document.createElement("div");
attendeeSection.classList.add("team-stats");

const attendeeHeading = document.createElement("h3");
attendeeHeading.textContent = "Checked-In Attendees";

const attendeeList = document.createElement("div");
attendeeList.id = "attendeeList";

attendeeSection.appendChild(attendeeHeading);
attendeeSection.appendChild(attendeeList);

// Add it underneath the team counters
document.querySelector(".team-stats").after(attendeeSection);

// -----------------------------------
// 4. Update the page
// -----------------------------------
function updateDisplay() {
  // Update total attendance
  attendeeCount.textContent = totalAttendees;

  // Update team totals
  waterCount.textContent = waterTeam;
  zeroCount.textContent = zeroTeam;
  powerCount.textContent = powerTeam;

  // Calculate progress percentage
  let progressPercentage =
    (totalAttendees / attendanceGoal) * 100;

  // Do not allow progress bar past 100%
  if (progressPercentage > 100) {
    progressPercentage = 100;
  }

  // Update progress bar
  progressBar.style.width = progressPercentage + "%";

  // Update attendee list
  displayAttendees();
}

// -----------------------------------
// 5. Save Progress - LEVEL UP
// -----------------------------------
function saveProgress() {
  localStorage.setItem("totalAttendees", totalAttendees);
  localStorage.setItem("waterTeam", waterTeam);
  localStorage.setItem("zeroTeam", zeroTeam);
  localStorage.setItem("powerTeam", powerTeam);

  // Save attendee names and teams
  localStorage.setItem(
    "attendees",
    JSON.stringify(attendees)
  );
}

// -----------------------------------
// 6. Get readable team name
// -----------------------------------
function getTeamName(team) {
  if (team === "water") {
    return "Team Water Wise";
  }

  if (team === "zero") {
    return "Team Net Zero";
  }

  return "Team Renewables";
}

// -----------------------------------
// 7. Find winning team - LEVEL UP
// -----------------------------------
function getWinningTeam() {
  const highestCount = Math.max(
    waterTeam,
    zeroTeam,
    powerTeam
  );

  // Check for ties
  const winners = [];

  if (waterTeam === highestCount) {
    winners.push("Team Water Wise");
  }

  if (zeroTeam === highestCount) {
    winners.push("Team Net Zero");
  }

  if (powerTeam === highestCount) {
    winners.push("Team Renewables");
  }

  // If more than one team has the highest count
  if (winners.length > 1) {
    return winners.join(" and ");
  }

  return winners[0];
}

// -----------------------------------
// 8. Display Attendee List - LEVEL UP
// -----------------------------------
function displayAttendees() {
  // Clear old list before rebuilding it
  attendeeList.innerHTML = "";

  attendees.forEach(function(attendee) {
    const attendeeItem = document.createElement("div");

    attendeeItem.style.padding = "12px";
    attendeeItem.style.marginBottom = "8px";
    attendeeItem.style.backgroundColor = "#f8fafc";
    attendeeItem.style.borderRadius = "8px";
    attendeeItem.style.textAlign = "left";

    attendeeItem.textContent =
      attendee.name + " — " + getTeamName(attendee.team);

    attendeeList.appendChild(attendeeItem);
  });
}

// -----------------------------------
// 9. Handle Check-In
// -----------------------------------
checkInForm.addEventListener("submit", function(event) {
  // Prevent page refresh
  event.preventDefault();

  // Get attendee information
  const name = attendeeName.value.trim();
  const team = teamSelect.value;

  // Make sure both fields are completed
  if (name === "" || team === "") {
    return;
  }

  // Increase total attendance
  totalAttendees++;

  // Increase selected team count
  if (team === "water") {
    waterTeam++;
  } else if (team === "zero") {
    zeroTeam++;
  } else if (team === "power") {
    powerTeam++;
  }

  // -----------------------------------
  // LEVEL UP: Save attendee information
  // -----------------------------------
  attendees.push({
    name: name,
    team: team
  });

  // Personalized greeting
  greeting.textContent =
    `Welcome to the Intel Sustainability Summit, ${name}!`;

  greeting.style.display = "block";
  greeting.classList.add("success-message");

  // Save everything
  saveProgress();

  // Update screen
  updateDisplay();

  // -----------------------------------
  // LEVEL UP: Celebration Feature
  // -----------------------------------
  if (totalAttendees === attendanceGoal) {
    const winningTeam = getWinningTeam();

    greeting.textContent =
      `🎉 Attendance goal reached! ${winningTeam} has the strongest turnout! 🎉`;
  }

  // Clear form
  attendeeName.value = "";
  teamSelect.selectedIndex = 0;

  // Return cursor to name input
  attendeeName.focus();
});

// -----------------------------------
// 10. Load saved information
// when page opens
// -----------------------------------
updateDisplay();