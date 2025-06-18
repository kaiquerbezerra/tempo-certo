# Tempo Certo

**Tempo Certo** é uma aplicação web desenvolvida para ajudar na **comparação de condições climáticas entre diferentes localidades**, como cidades, bairros ou até mesmo ruas específicas.  

Seu principal objetivo é **auxiliar na escolha do melhor local para eventos ao ar livre**, fornecendo dados meteorológicos precisos, visualizações intuitivas e recursos interativos para análise de clima em múltiplos pontos geográficos. A aplicação tem como público alvo ideal organizadores de eventos, profissionais de logística ou qualquer pessoa que precise tomar decisões baseadas no clima local.

---

## 🧰 Stack Tecnológica

- **Backend**: Python com [FastAPI](https://fastapi.tiangolo.com/)
- **Frontend**: React com TypeScript
- **API Externa**: [WeatherAPI](https://www.weatherapi.com/) para dados meteorológicos
- **UI**: Material-UI (MUI)

---

## 🔧 Funcionalidades

- 🔍 Busca de previsão do tempo por localização específica  
- 🌦️ Visualização de dados meteorológicos em tempo real  
- 📊 Gráficos interativos de temperatura ao longo do tempo  
- 📅 Previsão estendida para até **14 dias**  
- 🌡️ Alternância entre **Celsius e Fahrenheit**  
- ⏱️ Filtros de data e hora personalizáveis  
- 📱 Interface responsiva com Material-UI  

---

## 📋 Pré-requisitos

- [Python 3.10+](https://www.python.org/)
- [Node.js 18+](https://nodejs.org/)
- Chave de API da [WeatherAPI](https://www.weatherapi.com/)

---

## ⚙️ Configuração

### 1. Configuração da API Key

- Crie uma conta gratuita em [WeatherAPI](https://www.weatherapi.com/)
- Obtenha sua chave da API
- No diretório `backend`, copie o arquivo `.env.example` para `.env`
- Adicione sua chave da API no arquivo `.env`:

```env
WEATHER_API_KEY=sua-chave-aqui
