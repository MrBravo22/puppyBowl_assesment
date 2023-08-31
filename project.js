const ul = document.querySelector('ul');

const fetchDoggos = async () => {
    try {
        const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players");
        const json = await response.json();
        doggos = json.data.players;

        if (json.success && Array.isArray(doggos)) {
            const html = doggos.map(doggo => {
                return `
                <li>
                <a href='${doggo.name}'>
                <p>Doggo Name${doggo.name}</p>:
                ${doggo.breed}
                </a>
                </li>
                `;
            }).join('');
            ul.innerHTML = html;

            console.log(doggos);
        } else {
            console.error("Broken API response");
        }
    } catch (error) {
        console.error("Error fetching doggos:", error);
    }
};

fetchDoggos();
