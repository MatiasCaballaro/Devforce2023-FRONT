
import { useEffect,useState } from 'react'
import { sortTable,expandRow } from './functions/auxFunctions'
import { Modal } from '../Modal'

export const TablaRevocar = () => {

     //Para q el modal spawnee poner esto en los iconos/columnas q sean
    // data-bs-toggle="modal" data-bs-target="#aprobSoli"

    const [dirSort0,setDirSort0]=useState("asc")
    const [dirSort2,setDirSort2]=useState("asc")
    const [licencias,setLicencias]=useState([])
    const [usuarios,setUsuarios]=useState([])

    const [accion,setAccion]=useState("")
    const [titulo,setTitulo]=useState("")
    const [usuario,setUsuario]=useState("")
    const [plat,setPlat]=useState("")
    const [serial,setSerial]=useState("")
    const [coso,setCoso]=useState("")
    const [exp,setExp]=useState("")
    const [tipoSoli,setTipoSoli]=useState("")
    const [descripcion,setDescripcion]=useState("")
    const [mentorAsign,setMentorAsign]=useState("")
    const [adminAsign,setAdminAsign]=useState("")



    useEffect(() => {
        getLicencias(setLicencias)
    },[])

    const getLicencias=async (setLicencias) => {
        try {
            const data=await
                // axios.get('http://localhost:8080/api/solicitudesmentor')
                // const { data } = resp
                // console.log(data);

                fetch('http://localhost:8080/api/admin/licencias',{
                    mode: 'cors',
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Cache': 'no-cache',
                        'Access-Control-Allow-Origin': 'http://localhost:8080',
                    },
                    credentials: 'include',
                })
                    .then(resp => resp.json())
            setLicencias(data)
        } catch (error) {
            console.log({ error });
        }
    }

    const getUsuarios=async (setUsuarios) => {
        try {
            const data=await
                // axios.get('http://localhost:8080/api/solicitudesmentor')
                // const { data } = resp
                // console.log(data);

                fetch('http://localhost:8080/api/admin/licencias',{
                    mode: 'cors',
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Cache': 'no-cache',
                        'Access-Control-Allow-Origin': 'http://localhost:8080',
                    },
                    credentials: 'include',
                })
                    .then(resp => resp.json())
            setLicencias(data)
        } catch (error) {
            console.log({ error });
        }
    }

    const revocar=(usuario,plat,exp) => {
        setAccion("Revocar");
        setTitulo("Revocar Licencia");
        setCoso("Licencia");
        setSerial("");
        setUsuario(usuario);
        setPlat(plat);
        setExp(exp);
    }
    

    const reservar=(plat,serial) => {
        setAccion("Reservar");
        setTitulo("Reservar Licencia");
        setCoso("Licencia");

        setExp("");
        setUsuario("");
        setTipoSoli("");
        setDescripcion("");

        setPlat(plat);
        setSerial(serial);
    }

    
    const solicitud=(usuario,tipoSoli,descripcion/*, mentorAsign, adminAsign*/) => {
        setTitulo("Solicitud de la Licencia");
        setCoso("Solicitud");
        setUsuario(usuario);
        setTipoSoli(tipoSoli);
        setDescripcion(descripcion);
        /*setMentorAsign(mentorAsign);
        setAdminAsign(adminAsign);*/

        setPlat("");
        setSerial("");
        setExp("");
    }
    


    return (
        <>
            <table className="table shadow text-center align-middle table-sm" id='tablaUsuarios'>
                <thead className="text-white">
                    <tr>
                        <th scope="col">
                            <div className="d-flex justify-content-center align-items-center">Usuario
                                <div className="ms-2">
                                    <i onClick={() => { sortTable(0,dirSort0,setDirSort0) }} className="fa-solid fa-arrow-up text-secondary" id='col1'></i>
                                </div>
                            </div>
                        </th>
                        <th scope="col">
                            <div className="d-flex justify-content-center align-items-center">Plataforma
                                <div className="ms-2">
                                    <i onClick={() => { sortTable(0,dirSort0,setDirSort0) }} className="fa-solid fa-arrow-up text-secondary" id='col2'></i>
                                </div>
                            </div>
                        </th>
                        <th scope="col" className="align-middle">
                            <div className="d-flex justify-content-center align-items-center">Expiración
                                <div className="ms-2">
                                    <i onClick={() => { sortTable(0,dirSort0,setDirSort0) }} className="fa-solid fa-arrow-up text-secondary" id='col3'></i>
                                </div>
                            </div>
                        </th>
                        <th scope="col">
                            <div className="d-flex justify-content-center align-items-center">
                                Serial
                            </div>
                        </th>
                        <th scope="col">
                            <div className="d-flex justify-content-center align-items-center">
                                Ver solicitud
                            </div>
                        </th>
                        <th scope="col">
                            <div className="d-flex justify-content-center align-items-center">Estado
                                <div className="ms-2">
                                    <i onClick={() => { sortTable(0,dirSort0,setDirSort0) }} className="fa-solid fa-arrow-up text-secondary" id='col6'></i>
                                </div>
                            </div>
                        </th>
                        <th scope="col">
                            <div className="d-flex justify-content-center align-items-center">
                                Acciones
                            </div>
                        </th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody className="fs-7">

                {
                        licencias.map(lice => (
                            <tr key={lice.id}>
                                <td>
                                        {lice.estado != "ASIGNADA" && ("--")} 
                                        {lice.estado == "ASIGNADA" && (lice.solicitudes[lice.solicitudes.length -1].usuario.nombre+" "+lice.solicitudes[lice.solicitudes.length -1].usuario.apellido)}
                                        <br />
                                        {lice.estado == "ASIGNADA" && (<sub>{lice.solicitudes[lice.solicitudes.length -1].usuario.mail}</sub>)}
                                        <br />
                                        {lice.estado == "ASIGNADA" && (<sub>{lice.solicitudes[lice.solicitudes.length -1].usuario.phone}</sub>)}
                                </td>

                                <td>
                                {lice.plataforma}    
                                </td>

                                <td>
                                    <div className='d-flex justify-content-center align-items-top'>
                                        {   
                                             lice.vencimiento == null && ("--") 
                                        }
                                        {
                                            lice.vencimiento != null && (lice.vencimiento)
                                        }
                                    </div>
                                </td>

                                <td>
                                {lice.serie}    
                                </td>

                                <td> {
                                           lice.estado == 'ASIGNADA' && (<i onClick={() => solicitud(lice.solicitudes[lice.solicitudes.length -1].usuario.nombre+" "+lice.solicitudes[lice.solicitudes.length -1].usuario.apellido,lice.solicitudes[lice.solicitudes.length -1].tipo,lice.solicitudes[lice.solicitudes.length -1].descripcion)} data-bs-toggle="modal" data-bs-target="#aprobSoli" className="  text-center btn-solicitud ">Solicitud</i>)
                                        }   
                                </td>

                                <td>
                                {lice.estado}    
                                </td>

                                <td>
                                <div className='d-flex align-items-center'>
                                        {   
                                            lice.estado == 'DISPONIBLE' && (<i onClick={() => reservar(lice.plataforma,lice.serie)} data-bs-toggle="modal" data-bs-target="#aprobSoli" className="ms-2 fa-solid fa-clock"></i>) 
                                        }
                                        {
                                            lice.estado != 'DISPONIBLE' && (<i onClick={() => revocar(lice.solicitudes[lice.solicitudes.length -1].usuario.nombre+" "+lice.solicitudes[lice.solicitudes.length -1].usuario.apellido,lice.plataforma,lice.vencimiento)} data-bs-toggle="modal" data-bs-target="#aprobSoli" className="ms-2 fa-solid fa-xmark fa-xl me-2"></i>)
                                        }
                             
                                        <br />

                                        {   
                                             lice.estado == 'DISPONIBLE' && (<sub>Reservar</sub>) 
                                        }
                                        {
                                            lice.estado != 'DISPONIBLE' && (<sub>Revocar</sub>)
                                        }
                                </div>       
                                   
                                </td>

                                <td>
                                    <i onClick={() => expandRow(lice.id)} id={`s${lice.id}-expandIcon`} className="fa-solid fa-angle-down me-2 rotated"></i>
                                </td>
                                

                            </tr>
                        ))
                    }
                </tbody>
            </table >
            <Modal accion={accion} titulo={titulo} plataforma={plat} serialLic={serial} coso={coso} usuario={usuario} fechaExpir={exp} soli = {""} tipoSoli = {tipoSoli} descripcion = {descripcion}/>
        </>
    )
}
