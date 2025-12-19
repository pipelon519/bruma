export default function LoginSection(){
    return(
        <div className="bg-[var(--accent)] py-24 h-full w-[85%] rounded-4xl mx-auto items-center justify-center text-center mt-0">
        <h3 className="font-serif text-4xl text-center">Registrate/Inicia sesion para guardar tus recetas y adaptarlas a tus gustos</h3>
        <div>
            <button className="bg-[var(--bg2)] mx-2 px-5 rounded-full inline-block font-medium px-8 py-4 mt-10 transition-all hover:scale-120 hover:bg-[var(--bg)]">Iniciar sesion</button>
            <button className="bg-[var(--bg2)] mx-2 px-5 rounded-full inline-block font-medium px-8 py-4 mt-10 transition-all hover:scale-120 hover:bg-[var(--bg)]">Registrate</button>
        </div>
    </div>
    )
    
}