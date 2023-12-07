import { useState } from "react";
import Button from "react-bootstrap/Button";
import logo from "./logo.png";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postRegisterGame } from "../services/api";

function RegisterGameModal({ show, setShow }) {
  const [fullscreen, setFullscreen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      data.release_date = selectedDate.toDateString();
      await postRegisterGame(data);
      setIsLoading(false);
      setShow(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        key={"cccc"}
        className="me-2 mb-2 rounded-full"
        onClick={() => setShow(true)}
      >
        Cadastre um jogo agora <span aria-hidden="true">&rarr;</span>
      </Button>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <form className="px-5" onSubmit={handleSubmitForm}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Novo Jogo
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Preencha todos os campos para registrar um novo jogo gratuita
                  na biblioteca.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Título
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600 sm:max-w-md">
                        <input
                          type="text"
                          name="title"
                          id="title"
                          autoComplete="title"
                          autoFocus
                          required
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Título completo"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Descrição
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="short_description"
                        name="short_description"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="game_url"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      URL do jogo
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600 sm:max-w-md">
                        <input
                          type="game_url"
                          name="game_url"
                          id="game_url"
                          autoComplete="game_url"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="http://"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="thumbnail"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      URL da Imagem de Capa
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600 sm:max-w-md">
                        <input
                          type="thumbnail"
                          name="thumbnail"
                          id="thumbnail"
                          autoComplete="thumbnail"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="http://"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="publisher"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Desenvolvedora
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600 sm:max-w-md">
                        <input
                          type="publisher"
                          name="publisher"
                          id="publisher"
                          autoComplete="publisher"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Nome social"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="genre"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Genero
                    </label>
                    <div className="mt-2">
                      <select
                        id="genre"
                        name="genre"
                        autoComplete="genre"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>MMORPG</option>
                        <option>Strategy</option>
                        <option>Battle Royale</option>
                        <option>Shooter</option>
                        <option>Sports</option>
                        <option>Fantasy</option>
                        <option>Racing</option>
                        <option>Card</option>
                        <option>Fighting</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="plataform"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Plataforma
                    </label>
                    <div className="mt-2">
                      <select
                        id="plataform"
                        name="plataform"
                        autoComplete="plataform"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>PC</option>
                        <option>Mobile</option>
                        <option>Xbox</option>
                        <option>Playstation</option>
                        <option>Nintendo Switch</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="release_date"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Data de lançamento
                    </label>
                    <div className="mt-2">
                      <DatePicker
                        className="block w-full outline-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        selected={selectedDate}
                        required
                        onChange={(date) => setSelectedDate(date)}
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <p className="mt-2 text-xs text-red-600">
                    Erro ao tentar fazer o cadastro. Verifique os campos e tente
                    novamente.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => setShow(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Save
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RegisterGameModal;
