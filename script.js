// const link = 'https://fakestoreapi.com/products/category/electronics';

// const listaproductos = async () => {
//   const res = await fetch(link);
//   const data = await res.json();
//   console.log(data);

//   data.forEach(producto => {
//     const { title, price, image } = producto;
//     const card = document.createElement('div');
//     card.innerHTML = `
//       <img src="${image}" alt="${title}">
//       <h3>${title}</h3>
//       <p>${price}</p>
//     `;
//     document.body.appendChild(card);
//   });
// };

// listaproductos();