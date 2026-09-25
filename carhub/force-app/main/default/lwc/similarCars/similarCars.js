import { LightningElement, api, wire } from 'lwc';
import getSimilarCars from '@salesforce/apex/CarController.getSimilarCars'
import {getRecord} from 'lightning/uiRecordApi'
import MAKE_FIELD from '@salesforce/schema/car__c.Make__c'
import {NavigationMixin} from 'lightning/navigation'
export default class SimilarCars extends NavigationMixin(LightningElement){
    similarCars
    @api recordId
    @api objectApiName

    @wire(getRecord, {recordId: '$recordId', fields:[MAKE_FIELD]})
    car

    get carData() {
        console.log('Car data:', this.car);
        console.log(this.recordId, '----------------------')
        return this.car.data;
    }

    // fetchSimilarCars(){
    //     getSimilarCars({
    //         carId:this.recordId,
    //         makeType:this.car.data.fields.Make__c.value
    //     }).then(result=>{
    //         this.similarCars = result
    //         console.log(this.similarCars)
    //     }).catch(error=>{
    //         console.error(error)
    //     })
    // }

    fetchSimilarCars(){
        console.log('Fetching similar cars for recordId:', this.recordId);
        console.log('Make type:', this.car.data.fields.Make__c.value);
    
        getSimilarCars({
            recordId: this.recordId,
            makeType: this.car.data.fields.Make__c.value
        }).then(result => {
            this.similarCars = result;
            console.log('Similar cars fetched:', this.similarCars);
        }).catch(error => {
            console.error('Error fetching similar cars:', error);
        });
    }

        handleViewDetailsClick(event){
            console.log(this.car)
            this[NavigationMixin.Navigate]({
                type:'standard__recordPage',
                attributes:{
                    recordId:event.target.dataset.id,
                    objectApiName:this.objectApiName,
                    actionName:'view'
                }
            })
        }
}