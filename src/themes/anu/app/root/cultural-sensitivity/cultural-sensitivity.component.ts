import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ds-cultural-sensitivity',
  templateUrl: './cultural-sensitivity.component.html',
  styleUrls: ['./cultural-sensitivity.component.scss']
})

export class CulturalSensitivityComponent implements OnInit {
  isShow = false;
    
  ngOnInit(): void {
  }
  
  toggleDisplay(): void {
    this.isShow = !this.isShow;
  }
}