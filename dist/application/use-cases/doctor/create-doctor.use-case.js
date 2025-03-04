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
exports.CreateDoctorUseCase = void 0;
const domain_1 = require("../../../domain");
class CreateDoctorUseCase {
    constructor(doctorRepository) {
        this.doctorRepository = doctorRepository;
    }
    execute(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, specialty, avaiableDays } = options;
            const existingDoctor = yield this.doctorRepository.findByEmail(email);
            if (existingDoctor) {
                throw new Error('Doctor already exists');
            }
            const newDoctor = new domain_1.Doctor(crypto.randomUUID(), name, email, password, specialty, avaiableDays, [], 'doctor');
            return this.doctorRepository.save(newDoctor);
        });
    }
}
exports.CreateDoctorUseCase = CreateDoctorUseCase;
