// import { BASE_URL } from '../index.js'
// import { updateTextForElem } from '../utils/languages.js';
// import { formatDate, formatSeconds } from '../utils/date.js'
// import { isUserConnected } from "../utils/utils.js";
// import { navigateTo } from '../index.js';

// // Function that will be called when the view is loaded
// export async function pacmanStatistics () {
// 	if (!(await isUserConnected())) {
// 		navigateTo('/signin');
// 		return;
// 	}

// 	// Fetch global statistics and fill the global stat table
// 	const fillPacmanGlobalStatTable = async () => {
// 		const response = await fetch(`${BASE_URL}/api/pacman_stats`);
// 		if (response.status === 200) {
// 			const responseData = await response.json();
// 			const tr = document.getElementById('pacman-global-stat-tbody-tr');
// 			const columns = ['total_pacman_matches', 'total_pacman_time', 'max_endless_score']
// 			columns.forEach(column => {
// 				const td = document.createElement('td');
// 				if (column === 'total_pacman_time') {
// 					td.textContent = formatSeconds(responseData[column]);
// 				} else {
// 					td.textContent = responseData[column];
// 				}
// 				tr.appendChild(td);
// 			});
// 		}
// 	}

// 	// Fetch history statistics and fill the history table
// 	const fillPacmanHistoryStatTable = async () => {
// 		const response = await fetch(`${BASE_URL}/api/pacman_matches_history`);
// 		if (response.status === 200) {
// 			const matches = await response.json();
// 			// The JSON is an array of match objects
// 			// Get the tbody
// 			// Create an array with keys of the JSON object in the order I want to display them in
// 			// Map through the array, and create a tr element
// 			// go through the keys array, for each item, create a td with its textContent equal to the match[item]

// 			// Get the tbody from the table
// 			const tbody = document.getElementById('pacman-history-stat-tbody');

// 			// Empty the table
// 			tbody.innerHTML = '';

// 			// Define an array containing keys of a match in the order I want to display them in
// 			const columns = ['match_date', 'pacman_player', 'pacman_character', 'ghost_player', 'ghost_character', 'map_name', 'pacman_score', 'winner', 'match_duration'];

// 			// If there is no history stats, display a custom message
// 			if (matches.length === 0) {
// 				const tr = document.createElement('tr');
// 				const td = document.createElement('td');
// 				td.setAttribute('colspan', columns.length);
// 				td.setAttribute('data-translate', 'no stats');
// 				updateTextForElem(td, 'no stats');
// 				tr.appendChild(td);
// 				tbody.appendChild(tr);
// 				return;
// 			}

// 			// Map through the matches and create a tr filled with td for each match
// 			matches.forEach(match => {
// 				const tr = document.createElement('tr');
// 				columns.forEach(column => {
// 					const td = document.createElement('td');
// 					if (column === 'match_date') {
// 						td.textContent = formatDate(match[column]);
// 					} else if (column === 'match_duration') {
// 						td.textContent = match[column].substring(3);
// 					} else {
// 						td.textContent = match[column];
// 					}
// 					tr.appendChild(td);
// 				});
// 				tbody.appendChild(tr);
// 			})
// 		}
// 	}

// 	// Call the functions to update the tables
// 	fillPacmanGlobalStatTable();
// 	fillPacmanHistoryStatTable();
// }
//@ts-ignore
import { BASE_URL } from '../index.js';
import { updateTextForElem } from '../utils/languages.js';
import { formatDate, formatSeconds } from '../utils/date.js';
import { isUserConnected } from "../utils/utils.js";
//@ts-ignore
import { navigateTo } from '../index.js';

// Function that will be called when the view is loaded
export async function pacmanStatistics(): Promise<void> {
	if (!(await isUserConnected())) {
		navigateTo('/signin');
		return;
	}

	// Fetch global statistics and fill the global stat table
	const fillPacmanGlobalStatTable = async (): Promise<void> => {
		try {
			const response = await fetch(`${BASE_URL}/api/pacman_stats`);
			if (!response.ok) return;

			const responseData: { [key: string]: number } = await response.json();
			const tr = document.getElementById('pacman-global-stat-tbody-tr') as HTMLTableRowElement | null;
			if (!tr) return;

			const columns: string[] = ['total_pacman_matches', 'total_pacman_time', 'max_endless_score'];
			columns.forEach(column => {
				const td = document.createElement('td');
				td.textContent = column === 'total_pacman_time'
					? formatSeconds(responseData[column])
					: responseData[column]?.toString() ?? '0';
				tr.appendChild(td);
			});
		} catch (error) {
			console.error("Error fetching global stats:", error);
		}
	};

	// Fetch history statistics and fill the history table
	const fillPacmanHistoryStatTable = async (): Promise<void> => {
		try {
			const response = await fetch(`${BASE_URL}/api/pacman_matches_history`);
			if (!response.ok) return;

			const matches: any[] = await response.json();
			const tbody = document.getElementById('pacman-history-stat-tbody') as HTMLTableSectionElement | null;
			if (!tbody) return;

			tbody.innerHTML = '';

			const columns: string[] = [
				'match_date', 'pacman_player', 'pacman_character',
				'ghost_player', 'ghost_character', 'map_name',
				'pacman_score', 'winner', 'match_duration'
			];

			if (matches.length === 0) {
				const tr = document.createElement('tr');
				const td = document.createElement('td');
				td.colSpan = columns.length;
				td.setAttribute('data-translate', 'no stats');
				updateTextForElem(td, 'no stats');
				tr.appendChild(td);
				tbody.appendChild(tr);
				return;
			}

			matches.forEach((match) => {
				const tr = document.createElement('tr');
				columns.forEach(column => {
					const td = document.createElement('td');
					if (column === 'match_date') {
						td.textContent = formatDate(match[column]);
					} else if (column === 'match_duration') {
						td.textContent = typeof match[column] === 'string' ? match[column].substring(3) : '';
					} else {
						td.textContent = match[column]?.toString() ?? '';
					}
					tr.appendChild(td);
				});
				tbody.appendChild(tr);
			});
		} catch (error) {
			console.error("Error fetching match history:", error);
		}
	};

	// Call the functions to update the tables
	await fillPacmanGlobalStatTable();
	await fillPacmanHistoryStatTable();
}
