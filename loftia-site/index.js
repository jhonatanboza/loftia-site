const express = require("express");
const mercadopago = require("mercadopago");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Configure suas credenciais
mercadopago.configurations.setAccessToken("APP_USR-508195820528822-022120-42d7b2b8141abe4e3af8b91204b7409f-539440876");

app.post("/create_preference", async (req, res) => {
  const { quantity } = req.body;

  const preference = {
    items: [
      {
        title: "Kit 3 Luminárias LED",
        quantity: quantity,
        unit_price: 129.9,
        currency_id: "BRL",
      },
    ],
    back_urls: {
      success: "https://loftia.com.br/obrigado.html",
      failure: "https://loftia.com.br/falha.html",
      pending: "https://loftia.com.br/pendente.html",
    },
    auto_return: "approved",
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao criar preferência" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
