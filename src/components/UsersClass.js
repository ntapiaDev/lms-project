import { useEffect, useState } from "react";
import axios from "../api/axios";

const UsersClass = ({followed_class}) => {

  const [ className, setClassName ] = useState();
  const [ classLink, setClassLink ] = useState();

  const classes = followed_class.split(',')

  // Récupération des infos de cours
  useEffect(() => {
    let classNameList = [];
    let classLinkList = [];

    const getClasses = async () => {
      for (let i = 0; i < classes.length; i++) {
        try {
          const getClasses = await axios.get(`wp/v2/posts/${followed_class.split(',')[i]}`);
          classNameList.push(getClasses.data.title.rendered);
          classLinkList.push(getClasses.data.link);
        } catch (err) {
          console.log(err);
        }
      }
      setClassName(classNameList);
      setClassLink(classLinkList);
    }
    getClasses();
  }, [classes.length, followed_class]);

  return (
    <ul>
      {className?.map((Name, i ) => <li key={i}><a href={classLink[i]}>{Name}</a></li>)}
    </ul>
  )
}

export default UsersClass