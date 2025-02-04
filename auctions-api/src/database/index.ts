import path from "path";
import { Sequelize, DataTypes, ModelDefined } from "sequelize";
import { AuctionAttributes } from "../models/Auction";

const dbPath = path.resolve(__dirname, "auctions.db");

export const db = new Sequelize({
  dialect: "sqlite",
  storage: dbPath,
});

db.authenticate()
  .then(() => {
    console.log("==== Conectado ao banco de dados SQLite. ===== \n\n");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

export const Auction: ModelDefined<AuctionAttributes, any> = db.define(
  "Auction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startBid: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    highestBid: {
      type: DataTypes.FLOAT,
      defaultValue: null,
    },
    highestBidder: {
      //Nome de quem fez maior lance
      type: DataTypes.STRING,
      defaultValue: null,
    },
    status: {
      type: DataTypes.ENUM("active", "completed", "canceled"),
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    tableName: "auctions",
  }
);

export const Bid = db.define(
  "Bid",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    auctionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Auction,
        key: "id",
      },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "bids",
  }
);

Auction.hasMany(Bid, { as: "bids", foreignKey: "auctionId" });
Bid.belongsTo(Auction, { foreignKey: "auctionId" });

db.sync()
  .then(() => console.log("Tabelas sincronizadas!"))
  .catch((e) => console.error("Erro ao sincronizar tabelas:", e));
