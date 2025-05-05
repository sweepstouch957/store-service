  import mongoose from 'mongoose';

  const StoreSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Por favor ingrese el nombre de la tienda"],
        trim: true,
      },
      address: {
        type: String,
        required: [true, "Por favor ingrese la dirección"],
        trim: true,
      },
      zipCode: {
        type: String,
        required: [true, "Por favor ingrese el código postal"],
        trim: true,
      },
      location: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number],
          index: "2dsphere",
        },
      },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      ownerId: {
        type: String,
        required: [true, "Por favor ingrese el ID del propietario"],
      },
      description: {
        type: String,
        trim: true,
      },
      image: {
        type: String,
        default: "no-image.jpg",
      },
      active: {
        type: Boolean,
        default: true,
      },
      subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
      },
      phoneNumber: {
        type: String,
        trim: true,
      },
      twilioPhoneNumber: {
        type: String,
        trim: true,
      },
      twilioPhoneNumberSid: {
        type: String,
        trim: true,
      },
      twilioPhoneNumberFriendlyName: {
        type: String,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );

  StoreSchema.virtual("campaigns", {
    ref: "Campaign",
    localField: "_id",
    foreignField: "store",
    justOne: false,
  });

  StoreSchema.virtual("sweepstakes", {
    ref: "Sweepstake",
    localField: "_id",
    foreignField: "stores",
    justOne: false,
  });

  export default mongoose.model("Store", StoreSchema);
