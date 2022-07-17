import React from 'react'
import {useState, useEffect, useContext} from 'react'
import {useNavigate}  from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import styles from './CreatePost.module.css'

function CreatePost() {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")
  const naviga = useNavigate()
  const {insertDocument, response} = useInsertDocument("posts")
  const {user} = useAuthValue()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")
    //Validar image URL
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL  ")
    } 

    //criar o arra de tags 
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())
    //checar todos os valores 
    if(!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos")
    }
    if (formError) return;
    insertDocument({
      title, 
      image, 
      body,
      tagsArray, 
      uid: user.uid,
      createdBy: user.displayName
    })

    naviga("/")
  }
  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva o que quiser e compartilhe o seu conhecimento!</p>
    
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" autoFocus name='title' placeholder='Pense num bom título'/>
        </label>

        <label>
          <span>URL da imagem:</span>
          <input onChange={(e) => setImage(e.target.value)} value={image} type="text" autoFocus name='image' placeholder='Insira uma imagem que representa o seu post'/>
        </label>

        <label>
          <span>Conteúdo</span>
          <textarea name="body" required placeholder='Insira o conteúdo do post' onChange={(e) => setBody(e.target.value)}></textarea>        
        </label>

        <label>
          <span>Tags</span>
          <input onChange={(e) => setTags(e.target.value)} value={tags} type="text" autoFocus name='tags' placeholder='Insira as tags separadas por vírgula'/>
        </label>
     
        
          {!response.loading && <button className='btn'>
            Cadastrar
          </button>}

          {response.loading && (<button className='btn' disabled>
            Aguarde...
          </button>)}
          
          {response.error && <p className='error'>{response.error}</p>}
          {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost