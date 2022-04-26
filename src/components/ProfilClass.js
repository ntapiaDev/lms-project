const ProfilClass = ({className, classLink}) => {

    return (
        <section className="liste-cours">
            <h4>Liste des cours suivis :</h4>
            {className?.length
                ? <ul>{className?.map((classe, i) => <li key={i}><a href={classLink[i]}>{classe}</a></li>)}</ul>
                : <p>Aucun cours à afficher</p>
            }
         </section>
    )
}

export default ProfilClass