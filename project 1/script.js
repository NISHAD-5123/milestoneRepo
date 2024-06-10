document.addEventListener('DOMContentLoaded', () => {
    const addBlogBtn = document.getElementById('addBlogBtn');
    const addBlogModal = document.getElementById('addBlogModal');
    const closeModal = document.querySelector('.close');
    const addBlogForm = document.getElementById('addBlogForm');
    const blogList = document.getElementById('blogList');

    // Function to show the modal
    addBlogBtn.addEventListener('click', () => {
        addBlogModal.style.display = 'block';
    });

    // Function to hide the modal
    closeModal.addEventListener('click', () => {
        addBlogModal.style.display = 'none';
    });

    // Function to hide the modal when clicking outside the modal
    window.addEventListener('click', (event) => {
        if (event.target === addBlogModal) {
            addBlogModal.style.display = 'none';
        }
    });

    // Function to render the blog list
    const renderBlogs = () => {
        blogList.innerHTML = '';
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogs.forEach((blog, index) => {
            const blogPost = document.createElement('div');
            blogPost.classList.add('blog-post');
            blogPost.innerHTML = `
                <h2>${blog.title}</h2>
                <p><strong>Posted by:</strong> ${blog.poster}</p>
                <p>${blog.description}</p>
                <button onclick="viewBlog(${index})">Read More</button>
            `;
            blogList.appendChild(blogPost);
        });
    };

    // Function to handle the form submission
    addBlogForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = addBlogForm.title.value;
        const poster = addBlogForm.poster.value;
        const description = addBlogForm.description.value;
        const content = addBlogForm.content.value;

        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogs.push({ title, poster, description, content });
        localStorage.setItem('blogs', JSON.stringify(blogs));

        addBlogForm.reset();
        addBlogModal.style.display = 'none';
        renderBlogs();
    });

    // Function to view the full blog content
    window.viewBlog = (index) => {
        const blogs = JSON.parse(localStorage.getItem('blogs'));
        const blog = blogs[index];
        alert(`Title: ${blog.title}\nPoster: ${blog.poster}\n\n${blog.content}`);
    };

    // Initial rendering of the blogs
    renderBlogs();
});
