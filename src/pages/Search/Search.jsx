import React from 'react'
import PostDetail from '../../components/PostDetail'
import {useFetchDocuments} from '../../hooks/useFetchDocuments'
import {useQuery} from '../../hooks/useQuery'
import {Link} from 'react-router-dom'
import styles from './Search.module.css'
function Search() {

    const query = useQuery()
    const search = query.get("q")
    const {documents: posts} = useFetchDocuments("posts", search)
  return (
    <div className={styles.search_container}>
        <h2>Search</h2>
        <div>
            {posts && posts.length === 0 && (
                <div className={styles.noposts}>
                    <p>Não forma encontrados posts apartir da sua busca...</p>
                    <Link className="btn btn-dark" to="/">Voltar</Link>
                </div>
            )}
            {posts && posts.map((post) => (
                <PostDetail key={post.id} post={post}/>
            ))}
        </div>
    </div>
  )
}

export default Search