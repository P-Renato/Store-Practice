const url = 'https://fakestoreapi.com/products';

const fetchProducts = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        const container = document.querySelector('.products-container');

                
        if (container) {
            container.innerHTML = "";

            // Group products by category
            const categories = {};

            data.forEach(product => {
                if (!categories[product.category]) {
                    categories[product.category] = [];
                }
                categories[product.category].push(product);
            });

            // Create a box for each category
            for (const categoryName in categories) {
                const categoryBox = document.createElement('div');
                categoryBox.classList.add('category-box');

                const categoryHeading = document.createElement('h2');
                categoryHeading.textContent = categoryName;
                categoryBox.appendChild(categoryHeading);

                categories[categoryName].forEach(product => {
                    const productBox = document.createElement('div');
                    productBox.classList.add('product-box');

                    const img = document.createElement('img');
                    img.src = product.image || "";
                    img.style.width = '5em';
                    img.style.margin = '0.5em';
                    productBox.appendChild(img);

                    const title = document.createElement('h3');
                    title.textContent = product.title;
                    productBox.appendChild(title);

                    const description = document.createElement('p');
                    description.textContent = product.description || "";
                    productBox.appendChild(description);

                    const roundedToFive = Math.round(product.rating.rate * 10 / 5) * 5;  // This is to make it multiple to 5
                    const ratingStars = document.createElement('img');
                    ratingStars.src = `./ratings/rating-${roundedToFive}.png`;
                    ratingStars.style.height = '1em'
                    productBox.appendChild(ratingStars);
                    

                    const ratingCount = document.createElement('span');
                    ratingCount.textContent = product.rating.count;
                    productBox.appendChild(ratingCount);

                    const price = document.createElement('p');
                    price.textContent = `$${(product.price).toFixed(2)}`;
                    productBox.appendChild(price);

                    categoryBox.appendChild(productBox);
                });

                container.appendChild(categoryBox);
            }
        }

    } catch (error) {
        console.error('Error message!', error);
    }
};

fetchProducts();
 

