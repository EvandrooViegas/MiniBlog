import React from 'react'
import {useState, useEffect, useContext} from 'react'
import {useNavigate, useParams}  from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import styles from './EditPost.module.css'
import {useFetchDocument} from '../../hooks/useFetchDocument'

function EditPost() {

  const {id} = useParams()
  const {document: post} = useFetchDocument("posts", id)
  console.log(post)
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])

  useEffect(() => {
    if(post) {
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)

      const textTags = post.tagsArray.join(", ")
      setTags(textTags)
    }
  }, [post])

  const [formError, setFormError] = useState("")
  const navigate = useNavigate()
  const {updateDocument, response} = useUpdateDocument("posts")
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
    const data = {
      title, 
      image, 
      body,
      tagsArray, 
      uid: user.uid,
      createdBy: user.displayName
    }
    updateDocument(id, data)

    navigate("/dashboard")
  }
  return (
    <div className={styles.edit_post}>
      {post && (
        <>
        
        <h2>Editando Post: {post.title}</h2>
        <p>Altere os dados do post como desejar</p>
      
        <form onSubmit={handleSubmit}>
          <label>
            <span>Título:</span>
            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" autoFocus name='title' placeholder='Pense num bom título'/>
          </label>

          <label>
            <span>URL da imagem:</span>
            <input onChange={(e) => setImage(e.target.value)} value={image} type="text" autoFocus name='image' placeholder='Insira uma imagem que representa o seu post'/>
          </label>
          <p className={styles.preview_title}>Previw da imagem atual: </p>
          <img src="" alt={post.title}  className={styles.image_preview} src={post.image}/>

          <label>
            <span>Conteúdo</span>
            <textarea name="body" value={body} required placeholder='Insira o conteúdo do post' onChange={(e) => setBody(e.target.value)}></textarea>        
          </label>

          <label>
            <span>Tags</span>
            <input onChange={(e) => setTags(e.target.value)} value={tags} type="text" autoFocus name='tags' placeholder='Insira as tags separadas por vírgula'/>
          </label>
      
          
            {!response.loading && <button className='btn'>
              Editar
            </button>}

            {response.loading && (<button className='btn' disabled>
              Aguarde...
            </button>)}
            
            {response.error && <p className='error'>{response.error}</p>}
            {formError && <p className='error'>{formError}</p>}
        </form>
      </>
      )}
    </div>
  )
}

export default EditPost