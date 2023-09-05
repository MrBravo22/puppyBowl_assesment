const nav = document.querySelector('nav');
const detail = document.querySelector('#detail');
console.log(detail);
let doggos;

const render = () => {
    const hash = window.location.hash.slice(1) * 1;
    const html = doggos.map(doggo => {
        return `
          <a href='#${doggo.id !== hash ? doggo.id : ''}' class='${doggo.id === hash ? 'selected' : ''}'>
                    ${doggo.name}
                </a>
        `;
    }).join('');
    nav.innerHTML = html;

    const doggo = doggos.find(dog => dog.id === hash);

    let detailHtml = '';
    if (doggo) {
        detailHtml = `
            ${doggo.breed}
            <div style='background-image:url(${doggo.imageUrl})'>
            </div>
        `;
    }
    detail.innerHTML = detailHtml;
};

const fetchDoggos = async () => {
    try {
        const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players");
        const json = await response.json();
        doggos = json.data.players;

        render();

        const hash = window.location.hash.slice(1) * 1;

        if (json.success && Array.isArray(doggos)) {
            const html = doggos.map(doggo => {
                return `
                <nav>
                    <a href='#${doggo.id !== hash ? doggo.id : ''}' class='${doggo.id === hash ? 'selected' : ''}'>
                        ${doggo.name}
                    </a>
                </nav>
                `;
            }).join('');
            nav.innerHTML = html;

            console.log(doggos);
        } else {
            console.error("Broken API response");
        }
    } catch (error) {
        console.error("Error fetching doggos:", error);
    }
};

window.addEventListener('hashchange', () => {
    render();
});

fetchDoggos();

