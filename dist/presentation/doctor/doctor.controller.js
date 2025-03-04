"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorController = void 0;
const create_doctor_use_case_1 = require("../../application/use-cases/doctor/create-doctor.use-case");
class DoctorController {
    constructor(doctorRepository) {
        this.doctorRepository = doctorRepository;
        this.createDoctor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, specialty, avaiableDays } = req.body;
                const createDoctorUseCase = new create_doctor_use_case_1.CreateDoctorUseCase(this.doctorRepository);
                const doctor = yield createDoctorUseCase.execute({
                    name,
                    email,
                    password,
                    specialty,
                    avaiableDays
                });
                res.status(201).json({ message: 'Doctor created successfully', doctor });
            }
            catch (error) {
                res.status(400).json({ error: 'Bad request' });
            }
        });
        this.getDoctor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const doctor = yield this.doctorRepository.findById(id);
                if (!doctor) {
                    res.status(404).json({ error: 'Doctor not found' });
                }
                res.status(200).json({ doctor });
            }
            catch (error) {
                res.status(400).json({ error: 'Bad request' });
            }
        });
        this.getAllDoctor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const doctors = yield this.doctorRepository.findAll();
                res.json({ doctors });
            }
            catch (error) {
                res.status(400).json({ error: 'Bad request' });
            }
        });
        this.deleteDoctor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.doctorRepository.delete(id);
                res.json({ message: 'Doctor deleted successfully' });
            }
            catch (error) {
                res.status(400).json({ error: 'Bad request' });
            }
        });
    }
}
exports.DoctorController = DoctorController;
