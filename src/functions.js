export function colorBackGround(types) {
    let color = "#FFF";

    const name = types[0].type.name;

    switch (name) {
        case 'grass':
            color = "#c9ede7";
            break;
        case 'fire':
            color = "#f2a9a9";
            break;
        case 'water':
            color = "#b3d7e2";
            break;
        case 'electric':
            color = "#f2e100";
            break;
        case 'bug':
            color = "#B94100";
            break;
        case 'flying':
            color = "#B8AAA2";
            break;
        case 'normal':
            color = "#168B44";
            break;
        case 'fighting':
            color = "#F79504";
            break;
        case 'poison':
            color = "#8A55A0";
            break;
        case 'ground':
            color = "#4169E1";
            break;
        case 'rock':
            color = "#2F4F4F";
            break;
        case 'psychic':
            color = "#BC8F8F";
            break;
        case 'ice':
            color = "#F5DEB3";
            break;
        case 'ghost':
            color = "#363636";
            break;
        case 'steel':
            color = "#1C1C1C";
            break;
        case 'dragon':
            color = "#800000";
            break;
        case 'dark':
            color = "#000000";
            break;
        case 'fairy':
            color = "#DB7093";
            break;
        default:
            color = "#FFF";

    }
    return color;
}