import { Request, Response } from "express";




export class AdminController {

    createDoctor = async (req:Request, res: Response) => {
        res.json('createDoctor')
    }

    removeDoctor = async (req:Request, res: Response) => {
        res.json('removeDoctor')
    }
}