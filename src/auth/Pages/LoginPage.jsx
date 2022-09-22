import { useForm } from "../../customHooks/useForm";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import axios from 'axios';

export const LoginPage = () => {

	const { status, setstatus } = useContext(UserContext);

	const showPassword = () => {
		var input = document.getElementById("pass")
		if (input.type === "password") {
			input.type = "text";
		} else {
			input.type = "password";
		}
	}

	const { formState, onInputChange } = useForm({
		username: '', password: ''
	})
	const { username, password } = formState

	async function enviardatos(username, password) {
		try {
			const resp = await axios.post('http://localhost:8080/api/auth/signin', { username, password })
			const { data } = resp
			let dataarmada = {
				statusLog: data.ok,
				msg: data.mensaje,
				contenido: data.contenido,
				rolA: data.contenido.authorities[0].authority
			}
			setstatus(status => ({
				...status,
				...dataarmada
			})
			)
		} catch (error) {
			console.log({ error });
		}
	}

	return (
		<div className="contenedor">
			<div className="container">
				<div className="row  align-items-center">
					<div className="col-1"></div>
					<div className="col-5">
						<img className="login-ilustration" src='../../../assets/loginIlustration.svg' alt="Login Ilustration" />
					</div>
					<div className="col-lg-5 col-sm-12">
						<form onSubmit={(e) => { enviardatos(username, password); e.preventDefault() }}>
							<div className="card rounded-3 form-card d-flex justify-content-around">
								<div>
									<h1 className="text-center">Bienvenido</h1>
								</div>
								<div>
									<div className="row">
										<div className="col-2">
										</div>
										<div className="col-8">
											<p className="mb-0">Usuario</p>
											<label className="input-icon username w-100">
												<input className="input with-icon w-100" type="text" placeholder="Search" name="username" value={username} onChange={onInputChange} />
											</label>
										</div>
										<div className="col-2">
										</div>
									</div>
									<div className="row mt-4">
										<div className="col-2">
										</div>
										<div className="col-8">
											<p className="mb-0">Contraseña</p>
											<label className="input-icon password w-100">
												<input className="input with-icon w-100" type="password" placeholder="Search" id="pass" name="password" value={password} onChange={onInputChange} />
												<i className="fa-solid fa-eye btn" id="eye" onClick={showPassword}></i>
											</label>
										</div>
										<div className="col-2">
										</div>
									</div>
								</div>
								<div>
									<div className="row">
										<div className="col-3">
										</div>
										<div className="col-6 ">
											<button className="w-100 btn btn-dark" type="submit">Iniciar</button>
										</div>
										<div className="col-3">
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
					<div className="col-1"></div>
				</div>
			</div>
		</div>
	)
}