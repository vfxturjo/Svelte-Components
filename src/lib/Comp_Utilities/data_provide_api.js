export const fetchAll = () => {
	return new Promise((resolve, _) => {
		const returnEm = () => resolve(characters.map(c => ({ id: c.id, name: c.name })))
		setTimeout(returnEm, 100)
	})
}


export const fetchOne = (id) => {
	return new Promise((resolve, _) => {
		const returnEm = () => resolve(characters.find(c => c.id === id))
		setTimeout(returnEm, 1000)
	})
}

const characters = [
	{ id: 1, name: 'Leslie Knope', bio: 'Golden hair, loves waffles, friendship, and work. Not specifically in that order.'},
	{ id: 2, name: 'Ben Wyatt', bio: 'Creator of The Cones of Dunshire, bureaucrat with a heart of gold, lucky husband to Leslie.'},
	{ id: 3, name: 'Ron Swanson', bio: 'Swansong, how you livin? Enjoys breakfast food, privacy, fine wood working, and scotch.'},
	{ id: 4, name: 'Andy Dwyer', bio: 'AKA Johnny Karate, aka FBI agent Burt Maclan, aka Burt\'s borther, Chip... Hackman'},
	{ id: 5, name: 'April Ludgate', bio: 'Animal lover. Creature of the dark. Uses coffee stirrers to push her cuticles back.'},
]
