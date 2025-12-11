import styled, { keyframes } from "styled-components";
import { ScaleMacAnimation } from "../../styles/animations";

const FluctuateAnimation = keyframes`
  0%{
   transform: translatey(0);
  }50%{
    transform: translatey(-20px);
  }100%{
    transform: translatey(0);
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: ${(props) =>
    `linear-gradient(${props.theme.colors.secondary}, ${props.theme.colors.primary})`};
  position: relative;
  padding: 120px 24px 0 24px; /* compensa TopBar absoluto/Logo */

  @media (max-width: 1024px) {
    height: auto;
    padding: 110px 24px 64px 24px;
  }

  @media (max-width: 768px) {
    padding: 80px 16px 56px 16px; /* logo reduzida no mobile */
  }

  @media (max-width: 480px) {
    padding: 72px 12px 48px 12px;
  }
`;

export const HeroContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0 16px;

  @media (max-width: 1024px) {
    max-width: 960px;
  }
  @media (max-width: 768px) {
    max-width: 700px;
    padding: 0 12px;
  }
  @media (max-width: 480px) {
    max-width: 440px;
    padding: 0 10px;
  }
`;

export const ContainerFeatures = styled.div`
  display: flex;
  width: 100%;
  background: #fefefe;
  flex-direction: column;
  position: relative;
  min-height: ${(props) => (props.height ? props.height + "px" : "100%")};
  padding: 80px 24px 40px 24px;
  box-sizing: border-box;
  align-items: center;
  overflow-x: hidden;

  @media (max-width: 1024px) {
    padding: 72px 20px 32px 20px;
  }
  @media (max-width: 768px) {
    padding: 64px 16px 24px 16px;
  }
`;

export const FeatureWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 70px auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  border-bottom: 5px solid #c4c4c4;
  padding-bottom: 40px;

  /* Primeira sessão (Recolhimento) ocupa a viewport */
  &:first-of-type {
    min-height: 100vh;
    box-sizing: border-box;
  }

  /* Alterna a ordem imagem/texto automaticamente */
  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  &:last-child {
    border-bottom: none;
  }
  @media (max-width: 1024px) {
    gap: 32px;
    margin-top: 56px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
    border-bottom-width: 3px;
    padding-bottom: 24px;
  }
  @media (max-width: 480px) {
    margin-top: 40px;
  }

  /* Seção específica: Compra e venda facilitada */
  &.section-venda {
    @media (min-width: 769px) {
      /* Desktop: texto primeiro, imagem à direita */
      flex-direction: row-reverse;
    }
    @media (max-width: 768px) {
      /* Mobile: imagem primeiro, depois o texto */
      flex-direction: column;
    }
  }
  
  /* Seção específica: Portaria */
  &.section-portaria {
    @media (min-width: 769px) {
      /* Desktop: mantém imagem à esquerda, texto à direita */
      flex-direction: row;
    }
    @media (max-width: 768px) {
      /* Mobile: imagem primeiro, depois texto (stack) */
      flex-direction: column;
    }
  }
`;

export const FeatureImage = styled.img`
  max-width: 420px;
  width: 100%;
  height: auto;
  margin: 0 !important;

  @media (max-width: 1024px) {
    max-width: 360px;
  }
  @media (max-width: 768px) {
    max-width: 300px;
  }
  @media (max-width: 480px) {
    max-width: 240px;
  }
`;

export const FeatureTextContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-width: 300px;
  max-width: 560px;

  @media (max-width: 1024px) {
    max-width: 520px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 640px;
    align-items: flex-start;
    text-align: left;
  }

  /* Ajustes específicos para Portaria */
  &.portaria {
    align-items: center;
    text-align: center;
  }
  &.portaria .portaria-title {
    margin-bottom: 12px;
  }
  &.portaria .portaria-image {
    display: block;
    margin: 12px auto 24px auto !important;
  }
`;

export const FeatureTitle = styled.h2`
  font-size: 2em;
  color: #4a4a4a;
  font-weight: bold;
  margin-bottom: 40px;
  
  @media (max-width: 1024px) {
    font-size: 1.8em;
  }
  @media (max-width: 768px) {
    font-size: 1.6em;
    margin-bottom: 24px;
  }
  @media (max-width: 480px) {
    font-size: 1.4em;
  }
`;

export const FeatureDescription = styled.p`
  font-size: 24px;
  color: #4a4a4a;
  text-align: justify;
  text-justify: inter-word;
  line-height: 1.5;

  @media (max-width: 1024px) {
    font-size: 22px;
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const ImgDocuments = styled.img`
  max-width: 50%;
  margin-bottom: 5%;
  animation: ${ScaleMacAnimation} 400ms;
  animation-delay: 400ms;
  animation-fill-mode: backwards;
  height: auto;

  @media (max-width: 768px) {
    max-width: 70%;
  }
  @media (max-width: 480px) {
    max-width: 90%;
  }
`;

export const ButtonTry = styled.a`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  max-width: 331px;
  height: 50px;
  color: ${(props) => props.theme.colors.secondary};
  border-radius: 10px;
  font-size: 20px;
  animation: ${ScaleMacAnimation} 800ms;
  animation-delay: 1200ms;
  animation-fill-mode: backwards;
  text-decoration: none;
  background: #fff;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }
  
  @media (max-width: 1024px) {
    width: 40%;
    max-width: 300px;
    height: 48px;
    font-size: 18px;
  }
  @media (max-width: 768px) {
    width: 60%;
    max-width: 280px;
    height: 46px;
    font-size: 17px;
  }
  @media (max-width: 480px) {
    width: 80%;
    max-width: 260px;
    height: 44px;
    font-size: 16px;
  }
`;

export const Title = styled.h1`
  font-size: 2.5em;
  width: 60%;
  text-align: center;
  margin-bottom: 2%;
  color: white;
  animation: ${ScaleMacAnimation} 800ms;
  
  @media (max-width: 1024px) {
    width: 70%;
    font-size: 2.2em;
  }
  @media (max-width: 768px) {
    width: 90%;
    font-size: 2em;
  }
  @media (max-width: 480px) {
    width: 100%;
    font-size: 1.8em;
  }
`;

export const Description = styled.span`
  font-size: 1.4em;
  width: 70%;
  margin-bottom: 5%;
  animation: ${ScaleMacAnimation} 400ms;
  animation-delay: 800ms;
  animation-fill-mode: backwards;
  text-align: justify;
  text-justify: inter-word;
  color: white;
  max-width: 833px;
  line-height: 1.6;

  @media (max-width: 1024px) {
    width: 80%;
    font-size: 1.3em;
  }
  @media (max-width: 768px) {
    width: 90%;
    font-size: 1.2em;
  }
  @media (max-width: 480px) {
    width: 100%;
    font-size: 1.1em;
  }
`;

export const SlideButton = styled.a`
  font-size: 40px;
  text-decoration: none;
  color: white;
  position: absolute;
  left: calc(50% - 15px);
  bottom: 30px;
  cursor: pointer;
  animation: ${FluctuateAnimation} 2s infinite;
  &:hover {
    color: white;
  }
  @media (max-width: 768px) {
    font-size: 36px;
    bottom: 24px;
  }
  @media (max-width: 480px) {
    font-size: 32px;
    bottom: 20px;
  }
`;

export const PortariaTitle = styled.a`
  font-size: 1.5rem;
  color: #4A4A4A;
  font-weight: bold;
  margin-bottom: 1.5rem;
  display: block;
  text-decoration: none;
`;

export const PortariaTexto = styled.p`
  font-size: 0.8rem;
  color: #4A4A4A;
  text-decoration: none;
  display: block; // ou 'block' se quiser quebra natural
  text-align: justify;
  text-justify: inter-word;
`;

export const Divider = styled.div`
  width: 100%;
  margin: 0 auto;
  border-bottom: 5px solid #c4c4c4;
  margin-bottom: 1.5rem;
`;


