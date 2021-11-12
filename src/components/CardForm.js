import React, {useState} from 'react' 

const CardForm = ({ createCard }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [year, setYear] = useState('')
    const [imageURL, setImageURL] = useState('')

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleYearChange = (event) => {
        setYear(event.target.value)
    }

    const handleImageURLChange = (event) => {
        setImageURL(event.target.value)
    }

    const addCard = (event) => {
        event.preventDefault()
        createCard({
            title: title,
            description: description,
            year: year,
            imageURL: imageURL
        })

        setTitle('')
        setDescription('')
        setYear('')
        setImageURL('')
    }

    return (
        <div>
            <h2>Create new</h2>

            <form onSubmit={addCard}>
                <div>
                    title:
                    <input 
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    description:
                    <input 
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <div>
                    year:
                    <input 
                        value={year}
                        onChange={handleYearChange}
                    />
                </div>
                <div>
                    image url:
                    <input 
                        value={imageURL}
                        onChange={handleImageURLChange}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CardForm