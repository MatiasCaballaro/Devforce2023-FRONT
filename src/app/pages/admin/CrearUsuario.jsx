import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../../customHooks/useForm';
import { Modal } from '../../components/Modal';
import { triggerToast } from '../../components/PushNotiSimple';
import { NotificacionContext } from '../../../notificacionContext';
import { mostrarNoti } from '../../components/Notificacion';
import { Notificacion } from '../../components/Notificacion';


export const CrearUsuario = () => {

  const navigate = useNavigate();
  const [role, setRole]=useState([])

  const showPassword = () => {
		var input = document.getElementById("password1")
		if (input.type === "password") {
			input.type = "text";
		} else {
			input.type = "password";
		}
    var input2 = document.getElementById("password2")
		if (input2.type === "password") {
			input2.type = "text";
		} else {
			input2.type = "password";
		}
	}

  const { formState, onInputChange } = useForm({
    nombre: '', apellido: '', username: '',  phone: '', email: '', password: '', repitePassword: '', hasTeams: false
  })

  const { nombre, apellido, username, phone, email, password, repitePassword, hasTeams } = formState

  const hideOrShowInput = () => {
    var valorSeleccionado = document.getElementById("tipo-selector").value;
    var area = document.getElementById("mentor-area");
    if (valorSeleccionado == "mentor") {
      area.classList.remove("hide");
      document.getElementById("mentor-selector").disabled = false
    }
    else {
      document.getElementById("mentor-selector").required = false
      area.classList.add("hide");
      document.getElementById("mentor-selector").disabled = true
    }
  }

  const sendUsuario = async () => {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password1").value;
    const phone = document.getElementById("phone").value;
    if(document.getElementById("flexSwitchCheckDefault").checked == true){
      var hasTeams = true;
    }
    else{
      var hasTeams = false;
    }
    const mentorArea = document.getElementById("mentor-selector").value; 
    const role = [document.getElementById("tipo-selector").value];
    const data = { nombre, apellido, username, email, password, phone, hasTeams, mentorArea, role}
    console.log(data)
    fetch('http://localhost:8080/api/admin/registrarUsuario', {
      mode:'cors',
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache': 'no-cache',
          'Access-Control-Allow-Origin': 'http://localhost:8080',
      },
      credentials: 'include',
    }).then(resp => resp.json())
    console.log(data);
  }

  const{notificacion, setNotificacion} = useContext(NotificacionContext)
  const [accionNoti, setAccionNoti] = useState("")
  const [cosoNoti, setCosoNoti] = useState("")
  const [textoNoti, setTextoNoti] = useState("")

  useEffect(() => {
    if(notificacion == "modificado")
    {
        setAccionNoti('modificado')
        setCosoNoti('Usuario')
        setTextoNoti('exitosamente')
        mostrarNoti(1)
        setNotificacion("0")
    }
  },[])
  
  return (
    <>
      <div className='container-center'>
        <div className='card-form shadow rounded m-3'>
          <h2 className="text-center pt-4"> Crear Usuario</h2>
          <form onSubmit={(e) => { sendSolicitud(); e.preventDefault() }} className="p-3" id="createUserForm">

            <h5>Tipo de usuario:</h5>
            <select id='tipo-selector' className="form-select" onChange={() => hideOrShowInput()} defaultValue={0}>
              <option disabled value={0}>Tipo de usuario</option>
              <option value={"usuario"}>USER</option>
              <option value={"mentor"}>MENTOR</option>
              <option value={"admin"}>ADMIN</option>
            </select>

            <div id='mentor-area' className="hide mt-4">
              <h5 className='mt-4'>Área de mentor:</h5>
              <select id='mentor-selector' className="form-select" defaultValue={0} onChange={onInputChange} disabled>
                <option disabled value={0}>Elegí un área para el mentor</option>
                <option value={"BACKEND"}>Back-End</option>
                <option value={"FRONTEND"}>Front-End</option>
                <option value={"BD"}>Base de Datos</option>
                <option value={"CRM"}>CRM</option>
                <option value={"SALESFORCE"}>Saleforce</option>
              </select>
            </div>

            <div className="row">
              <div className="col-sm">
                <h5 className='mt-4'>Nombre:</h5>
                <input className="form-control i " placeholder="Ej:Juan" rows="1" name="nombre" value={nombre} onChange={onInputChange} id="nombre"></input>
              </div>
              <div className="col-sm">
                <h5 className='mt-4'>Apellido:</h5>
                <input className="form-control i " placeholder="Ej:Ramirez" rows="1" name="apellido" value={apellido} onChange={onInputChange} id="apellido"></input>
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <h5 className='mt-4'>Nombre de usuario:</h5>
                <input className="form-control i " placeholder="Ej:JPerez" rows="1" name="username" value={username} onChange={onInputChange} id="username"></input>
              </div>
              <div className="col-sm">
                <h5 className='mt-4'>Número de teléfono:</h5>
                <input className="form-control i " placeholder="Ej:+54 9 1123867095" rows="1" name="phone" value={phone} onChange={onInputChange} id="phone"></input>
              </div>
            </div>

            <h5 className='mt-4'>Mail:</h5>
            <input className="form-control i " placeholder="juan.perez@gire.com" rows="1" name="email" value={email} onChange={onInputChange} id="email"></input>

            <div className="row">
              <div className="col-sm">
                <h5 className='mt-4'>Contraseña:</h5>
                <div className=" input-icon password w-100">
									<input className="form-control i  with-icon w-100" type="password" placeholder="Contraseña" id="password2" name="password" value={password} onChange={onInputChange} />
									<i className="fa-solid fa-eye btn" id="eye" onClick={showPassword}></i>
								</div>
              </div>
              <div className="col-sm">
                <h5 className='mt-4'>Repetir Contraseña:</h5>
                <div className=" input-icon password w-100">
									<input className="form-control i  with-icon w-100" type="password" placeholder="Contraseña" id="password1" name="repitePassword" value={repitePassword} onChange={onInputChange} />
									<i className="fa-solid fa-eye btn" id="eye" onClick={showPassword}></i>
								</div>
              </div>
            </div>

            <div className = "d-flex align-items-center mt-2">
                <img className="mt-2" src="/src/assets/teamsLogo.png"  width="70" height="35"></img>
                <h5 className='TieneEquipos'>Tiene teams?</h5>
                <div className="form-check form-switch" id="checkBoxDiv">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" name="hasTeams" onChange={onInputChange}></input>
                </div>
            </div>
          </form>
            <div className="d-flex my-4 mt-0">
              <button className='btn btn-outline-dark w-75 me-4' id="cancelBtnCR" onClick={() => navigate(-1)}>Cancelar</button>
              <button className='btn btn-dark w-75 ms-4' id="createBtnCR" data-bs-toggle="modal" data-bs-target="#aprobSoli" onClick={()=>{setRole(document.getElementById("tipo-selector").value); sendUsuario()}} >Crear</button>
            </div>
        </div>
      </div>
      <Modal accion="Crear" titulo="Confirmar creacion de usuario"  usuario={username} role={role} coso="Usuario" mail={email}/>
      <Notificacion accion={accionNoti} coso={cosoNoti} texto={textoNoti}/>
    </>
  )
}