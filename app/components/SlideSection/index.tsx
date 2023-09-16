import React, { useEffect, useState } from "react";
import Image from "next/image";

const SlideSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Defina as imagens e os textos correspondentes em arrays
    const images = ["/images/imagem1.jpg", "/images/imagem2.jpg", "/images/imagem1.jpg", "/images/imagem2.jpg"];
    const texts = [" A inovação que você procuraA inovação que você procuraA inovação que você procuraA inovação que você procuraA inovação que você procuraA inovação que você procura.", "A inovão que você procuraA inovação que você procuraA inovação que você procuraA inovação que você procura.", "A inovação que você procuraA inovação que você procuraA inovação que você procuraA inovação que você procuraA inovação que você procuraA inovação que você procura.", "A inovação que você procuraA inovação que você procuraA inovação que você procuraA inovação que você procuraA inovação que você procuraA inovação que você procura."];

    // Função para trocar de slide com base no índice do texto clicado
    const changeSlide = (index: number) => {
        setCurrentSlide(index);
    };

    // ...
    useEffect(() => {
        // Define um intervalo de tempo para trocar automaticamente os slides a cada 5 segundos (5000 milissegundos)
        const interval = setInterval(() => {
            const nextSlide = (currentSlide + 1) % images.length; // Avança para o próximo slide
            setCurrentSlide(nextSlide);
        }, 5500);

        // Limpa o intervalo quando o componente é desmontado para evitar vazamento de memória
        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, [currentSlide]);
    // ...


    return (
        <div className="py-12 lg:py-28">
            <div className="flex flex-col justify-center items-center">
                <h1 className="paragraph text-[11vw] lg:text-[6rem] font-coolveticaRg lg:leading-[4.5rem]">Como a Stellar</h1>
                <span className="text-white text-[11vw] lg:text-[2rem] font-coolveticaRg lg:mb-12 lg:tracking-wide lg:leading-[2rem]">converte ideias em soluções.</span>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center lg:mx-auto lg:max-w-screen-2xl lg:gap-x-12">
                <div className="flex items-center justify-center py-6 mx-4 lg:w-full">
                    <Image className="rounded-lg" src={images[currentSlide]} alt="imagem-slider" width={600} height={300} />
                </div>
                <div className="flex items-center justify-center text-white font-coolveticaRg text-left lg:text-lg">
                    <ul className="flex flex-col justify-start items-start gap-y-4 lg:gap-y-12">
                        {texts.map((text, index) => (
                            <li
                                className={` ${currentSlide === index ? "flex items-start justify-center gap-x-4 text-white" : "flex items-start justify-center gap-x-4 text-gray-500 hover:text-gray-600 duration-300 ease-in cursor-pointer"}`}
                                key={index}
                                onClick={() => changeSlide(index)}
                            >
                                <span key={index} className={`${currentSlide === index ? "border-[2px] border-white bg-gray-500 py-[12px] px-[10px] rounded-full" : "px-[10px] py-[12px] bg-gray-400 rounded-full hover:bg-gray-600 duration-300 ease-in cursor-pointer"}`}></span>
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SlideSection;