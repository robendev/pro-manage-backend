import User from "../models/User.js";
import CustomError from "../errors/CustomErrors.js";

export class CollaboratorsController {
    static findCollaboratorByEmail = async (req, res, next) => {
        const { email } = req.body;
        try {
            const user = await User.findOne({ email }).select("_id username email");
            if (!user) {
                throw new CustomError("Usuario no encontrado.", 404);
            }
            res.json(user);
        } catch (err) {
            next(err);
        }
    };
    static addCollaboratorById = async (req, res, next) => {
        const { collaboratorId } = req.body;
        try {
            const user = await User.findById(collaboratorId).select("_id");
            if (!user) {
                throw new CustomError("Usuario no encontrado.", 404);
            }
            const isActiveCollaborator = req.project.collaborators.some(
                collaborator => collaborator._id.toString() === collaboratorId
            );
            if (isActiveCollaborator) {
                throw new CustomError("El usuario ya es un colaborador activo.", 409)
            };
            req.project.collaborators.push(user._id);
            await req.project.save();
            res.status(201).json({ message: "Colaborador agregado exitosamente." });
        } catch (err) {
            next(err);
        }
    };
    static removeCollaboratorById = async (req, res, next) => {
        const { collaboratorId } = req.body;
        try {
            const isActiveCollaborator = req.project.collaborators.some(
                collaborator => collaborator._id.toString() === collaboratorId.toString()
            );
            if (!isActiveCollaborator) {
                throw new CustomError("El usuario no existe o no es colaborador del proyecto.", 409)
            };
            req.project.collaborators = req.project.collaborators.filter(
                collaborator => collaborator._id.toString() != collaboratorId
            );
            await req.project.save();
            res.status(200).json({ message: "Colaborador eliminado exitosamente." })
        } catch (err) {
            next(err);
        }
    };
}