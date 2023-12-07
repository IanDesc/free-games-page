import { useState } from "react";
import Button from "react-bootstrap/Button";
import logo from "./logo.png";
import Modal from "react-bootstrap/Modal";
import { postLogin } from "../services/api";

function LoginModal({ show, setShow }) {
  const [fullscreen, setFullscreen] = useState(true);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      await postLogin(data);
      const token = localStorage.getItem("token");

      if (token) {
        console.log(token);
        window.location.reload();
        setShow(false);
      } else {
        setError(true);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      {localStorage.getItem("token") ? (
        <Button
          key={"cccc"}
          className="me-2 mb-2 bg-transparent border-white border-2"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Sair
        </Button>
      ) : (
        <Button
          key={"cccc"}
          className="me-2 mb-2 bg-transparent border-white border-2"
          onClick={() => setShow(true)}
        >
          Fazer Login
        </Button>
      )}

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img src={logo} alt="Logo" className="mx-auto h-12 w-auto" />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Entre na sua conta
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmitForm}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Endereço de email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      autoFocus
                      required
                      className="block w-full p-2 rounded-md border-1 border-slate-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Senha
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md p-2 border-1 border-slate-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {error && (
                  <p className="mt-2 text-xs text-red-600">
                    Erro ao tentar fazer o login. Verifique os campos e tente
                    novamente.
                  </p>
                )}

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;
