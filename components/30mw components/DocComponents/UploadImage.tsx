import { cn } from '@/lib/utils'
import React from 'react'
import { ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '@/firebase'
import { Timestamp, addDoc, and, collection, getDocs, query, where } from 'firebase/firestore'

type Props = {
  children:({id,loading}:{id:string,loading:boolean})=>React.ReactNode
  className?: string
  folder:string
  returnImage:(imageUrl:string)=>void
  defaultFolder?:boolean
}

function UploadImage({children,returnImage,className,folder,defaultFolder=true}: Props) {
  const random = String(Math.random())
  const [file , setFile] = React.useState<File|null>(null)
  const [loading, setLoading] = React.useState(false)
  // const [folderId, setFolder] = React.useState<string>()
  const onChangeFile = async(e: React.ChangeEvent<HTMLInputElement>)=>{

      let folderId : string;
        if(defaultFolder) {

        const a = await getDocs(
            query(
                collection(db, "_30mw_filesystem"),
                and(
                    where("type", "==", "folder"),
                    where("_30mw_deleted", "==", false),
                    where("name", "==", folder),
                    where("motherFolder", "==", "home")
                )
            )
        ).then((docs) => {
            if (docs.size > 0) {
                const _folder = docs.docs[0].data();
                folderId = (docs.docs[0].id);
            } else {
                addDoc(
                    collection(db, "_30mw_filesystem"),
                    {
                        _30mw_deleted: false,
                        _30mw_createdAt: Timestamp.now(),
                        _30mw_updatedAt: Timestamp.now(),
                        motherFolder: "home",
                        name: folder ?? "test",
                        type: "folder",
                        path: [{ name: "home", id: "home" }],
                    }
                ).then((doc) => {
                    folderId = (doc.id);
                });
            }
        });


        }



    setLoading(true)
    if(!e.target.files) return
    const name = ""+ Date.now() as string
    const storageRef = ref(storage, `${folder}/${name}`);
    uploadBytes(storageRef, e.target.files[0] as File).then((snapshot) => {
      returnImage(`https://firebasestorage.googleapis.com/v0/b/mw-typescript.appspot.com/o/${folder}%2F${name}?alt=media&token=d849d7ec-d80e-4297-8a2e-85f5d26f4c31`)
      setLoading(false)
      addDoc(collection(db, "_30mw_filesystem"), {
        _30mw_deleted: false,
        _30mw_createdAt: Timestamp.now(),
        _30mw_updatedAt: Timestamp.now(),
        motherFolder:!defaultFolder ? folder : folderId as string,
        name: name,
        type: "file",
        url: `https://firebasestorage.googleapis.com/v0/b/mw-typescript.appspot.com/o/${folder}%2F${name}?alt=media&token=d849d7ec-d80e-4297-8a2e-85f5d26f4c31`
      })
    })
  }
  return (
    <div className={cn(className)}>
      <input accept='image/*' id={random} onChange={onChangeFile} type="file"  hidden/>
      <label htmlFor={random} >
        {children({id:random,loading})}
      </label>
    </div>
  )
}

export default UploadImage