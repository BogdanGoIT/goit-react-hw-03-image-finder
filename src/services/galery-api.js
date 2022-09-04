function fetchGalery(name, page){
    return (
        fetch(`https://pixabay.com/api/?q=${name}&page=${page}&key=28315893-0fd806bb9dd4884845b8c425c&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            return Promise.reject(new Error(`Нет картинки с таким именим ${name}`))
        })
    )
}

const api = {
    fetchGalery,
};

export default api