export function getCoursesFromApi() {
    let url = 'https://bugalez.tk/api/api/post/read.php';
    
    return fetch(url)
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

export function getCoursesFromApiwithText(text){
    let url = `https://bugalez.tk/api/api/post/read_single.php?produit=${text}`;
    
    return fetch(url)
    .then(res=>res.json())
    .catch(err=>console.log(err))
}


export function postCoursesFromApiUpdate(item){
    let url = `https://bugalez.tk/api/api/post/update.php`;

    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: item.id,
            produit: item.produit,
            prix: item.prix,
            unite: item.unite
        })
    })
}