import { Component, OnInit } from '@angular/core';
import { MenuID } from 'src/app/shared/menu/menu-id.model';
import { MenuItemType } from 'src/app/shared/menu/menu-item-type.model';
import { ExternalLinkMenuItemModel } from 'src/app/shared/menu/menu-item/models/external-link.model';
import { NavbarComponent as BaseComponent } from '../../../../app/navbar/navbar.component';
import { slideMobileNav } from '../../../../app/shared/animations/slide';
import { LinkMenuItemModel } from 'src/app/shared/menu/menu-item/models/link.model';

/**
 * Component representing the public navbar
 */
@Component({
  selector: 'ds-navbar',
  styleUrls: ['./navbar.component.scss'],
  // styleUrls: ['../../../../app/navbar/navbar.component.scss'],
  templateUrl: './navbar.component.html',
  // templateUrl: '../../../../app/navbar/navbar.component.html',
  animations: [slideMobileNav]
})


export class NavbarComponent extends BaseComponent implements OnInit {

  ngOnInit() {
    super.ngOnInit();
    this.addToPublicMenu();
  }

  addToPublicMenu() {
    const menuList: any[] = [{
      id: 'related_links_archive',
      parentID: 'browse_related_links',
      active: false,
      visible: true,
      index: 11,
      model: {
        type: MenuItemType.EXTERNAL,
        text: 'ANU Archives',
        href: 'https://archives.anu.edu.au/'
      } as ExternalLinkMenuItemModel,
    }, {
      id: 'related_links_press',
      parentID: 'browse_related_links',
      active: false,
      visible: true,
      index: 11,
      model: {
        type: MenuItemType.EXTERNAL,
        text: 'ANU Press',
        href: 'https://press.anu.edu.au/'
      } as ExternalLinkMenuItemModel,
    }, {
      id: 'related_links_library',
      parentID: 'browse_related_links',
      active: false,
      visible: true,
      index: 11,
      model: {
        type: MenuItemType.EXTERNAL,
        text: 'ANU Library',
        href: 'http://anulib.anu.edu.au/'
      } as ExternalLinkMenuItemModel,
    }, {
      id: 'related_links_rsd',
      parentID: 'browse_related_links',
      active: false,
      visible: true,
      index: 11,
      model: {
        type: MenuItemType.EXTERNAL,
        text: 'Research Services Division',
        href: 'https://services.anu.edu.au/business-units/research-services-division'
      } as ExternalLinkMenuItemModel,
    }, 
    {
      id: 'about_about',
      parentID: 'about',
      active: false,
      visible: true,
      index: 5,
      model: {
        type: MenuItemType.EXTERNAL,
        text: 'About',
        href: 'https://anulib.anu.edu.au/collections/open-research'
      } as ExternalLinkMenuItemModel,
    },
    {
      id: 'about_publish',
      parentID: 'about',
      active: false,
      visible: true,
      index: 5,
      model: {
        type: MenuItemType.EXTERNAL,
        text: 'Publish',
        href: 'https://anulib.anu.edu.au/collections/open-research/publishing-open-access'
      } as ExternalLinkMenuItemModel,
    },
    
    {
      id: 'about_policy',
      parentID: 'about',
      active: false,
      visible: true,
      index: 5,
      model: {
        type: MenuItemType.EXTERNAL,
        text: 'Policy',
        href: 'https://anulib.anu.edu.au/collections/open-research/policy'
      } as ExternalLinkMenuItemModel,
    },
    {
      id: 'about_copyright',
      parentID: 'about',
      active: false,
      visible: true,
      index: 5,
      model: {
        type: MenuItemType.EXTERNAL,
        text: 'Copyright',
        href: 'https://anulib.anu.edu.au/collections/open-research/copyright-considerations'
      } as ExternalLinkMenuItemModel,
    },
    {
      id: 'about_contact',
      parentID: 'about',
      active: false,
      visible: true,
      index: 5,
      model: {
        type: MenuItemType.EXTERNAL,
        text: 'Contact',
        href: 'https://anulib.anu.edu.au/collections/open-research'
      } as ExternalLinkMenuItemModel,
    }
  ];

    menuList.push({
      id: 'browse_related_links',
      active: false,
      visible: true,
      index: 11,
      model: {
        type: MenuItemType.TEXT,
        text: 'Related Links',
      } as ExternalLinkMenuItemModel,
    });
    menuList.push({
      id: 'about',
      active: false,
      visible: true,
      index: 5,
      model: {
        type: MenuItemType.TEXT,
        text: 'About'
      } as ExternalLinkMenuItemModel,
    });

    menuList.push({
      id: 'contribute',
      active: false,
      visible: true,
      index: 6,
      model: {
        type: MenuItemType.EXTERNAL,
        text: 'Contribute',
        href: 'https://anulib.anu.edu.au/collections/open-research/contribute'
      } as ExternalLinkMenuItemModel,
    });

    menuList.forEach((menuSection) => this.menuService.addSection(MenuID.PUBLIC, Object.assign(menuSection, {
      shouldPersistOnRouteChange: true
    })));
  }
}
