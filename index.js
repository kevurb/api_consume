const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=3'
const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites'
const API_URL_DELETE= (id)=>`https://api.thedogapi.com/v1/favourites/${id}`;
API_URL_UPLOAD_PHOTO = 'https://api.thedogapi.com/v1/images/upload'
const api = axios.create({
    baseURL:'https://api.thedogapi.com/v1/'

})
api.defaults.headers.common['x-api-key']= 'live_dup3NtYBIr4A6qiiELMSQc8fJLAAq6NTRZLCf9t0YsAQjTqW65kAkPwd6kurpRl0'
// fetch(Api_Url)
// .then(res => res.json())
// .then (data =>{
//     const img = document.querySelector('img')
//     console.log(data.url)
//     img.src = data[0].url;
    
//     console.log(img_url)
// })
const spanError = document.getElementById('spanE')

async function loadRandomDog (){
    const res = await  fetch(API_URL_RANDOM);
    const data = await res.json()
    console.log("random",data)
    
    
    if (res.status !== 200){
        spanError.innerHTML = "Hubo un error" + res.status + data.message;
    }else{
        const img1 = document.getElementById('img1')
        const img2 = document.getElementById('img2')
        const img3 = document.getElementById('img3')
        const btn1 = document.getElementById('btn1')
        const btn2 = document.getElementById('btn2')
        const btn3 = document.getElementById('btn3')

        
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;

        btn1.onclick= ()=> saveFavoutire(data[0].id)
        btn2.onclick= ()=> saveFavoutire(data[1].id)
        btn3.onclick= ()=> saveFavoutire(data[2].id)
        
    }
}       

async function loadFavourites() {
    const res1 = await fetch(API_URL_FAVORITES,{
        method: 'GET',
        headers: {
           'x-api-key' : 'live_dup3NtYBIr4A6qiiELMSQc8fJLAAq6NTRZLCf9t0YsAQjTqW65kAkPwd6kurpRl0'
        }
    })
    const data2 = await  res1.json()
    

    if(res1.status !== 200){
        spanError.innerHTML = "Hubo un error al cargar favoritos " + res1.status + data2.message;
    }
    else{
        
        const section = document.getElementById('favoritesDogs')
        section.innerHTML="";
        const h2 =  document.createElement('h2');
        const h2Text = document.createTextNode('Perros Favoritos');
        h2.appendChild(h2Text)
        section.appendChild(h2)
        data2.forEach(dog=>{
           // dog.image.url
           
           const articule = document.createElement('article')
           articule.className = 'images-Favgrid'
           const img = document.createElement('img');
           img.className= 'img-Fav'
           const btn = document.createElement('button');
           const btnText = document.createTextNode('Sacar el perro de Favoritos')
           btn.className= 'deleteButton'
           btn.appendChild(btnText)
           btn.onclick=()=>  deleteFavourite(dog.id)
           img.src = dog.image.url
           img.width= 150
           articule.appendChild(img)
           articule.appendChild(btn)
           section.appendChild(articule)
        })
    }
    
}
async function saveFavoutire(id) {
    const {data, status}= await api.post('/favourites',{
        image_id: id,
    })
    // const res = await fetch(API_URL_FAVORITES, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'x-api-key' : 'live_dup3NtYBIr4A6qiiELMSQc8fJLAAq6NTRZLCf9t0YsAQjTqW65kAkPwd6kurpRl0'
    //     },
    //     body: JSON.stringify({
    //         image_id: id

    //     })

    // });
    // const data = res.json();
    if(status!==200){
        spanError.innerHTML = "Hubo un error: " + status + data;
    }
    else{
        console.log('save', data)
        loadFavourites();
    }
    
    
}
async function deleteFavourite(id) {
    const res = await fetch(API_URL_DELETE(id), {
        method: 'DELETE',
        headers : {
            'x-api-key' : 'live_dup3NtYBIr4A6qiiELMSQc8fJLAAq6NTRZLCf9t0YsAQjTqW65kAkPwd6kurpRl0'
        }

    });
    const data = await res.json();
    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error al guardar favoritos" + res.status + data.message;
    }
    else{
        console.log('Eliminado')
        loadFavourites();
    }
    
}
async function uploadDogPhoto() {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);
    const res = await fetch(API_URL_UPLOAD_PHOTO,{
        method: 'POST',
        headers: {
            //'Content-Type' : 'multipart/form-data',
            'x-api-key' : 'live_dup3NtYBIr4A6qiiELMSQc8fJLAAq6NTRZLCf9t0YsAQjTqW65kAkPwd6kurpRl0'
        },
        body: formData,
        
    })
    const data = await res.json();
    if (res.status !== 201){
        spanError.innerHTML= "hubo un error_" + res.status + data.message
        console.log({data})
    }else{
        console.log('Foto subida :)')
        console.log({data})
        console.log(data.url)
        saveFavoutire(data.id)
    }
     
}
loadRandomDog();
loadFavourites();



