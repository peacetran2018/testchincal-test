import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { HierarchyService } from '../services/hierarchy/hierarchy.service';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent implements OnInit, AfterViewInit {
  userName: string = "";
  hierarchies: any[] = [];
  @ViewChildren("options") options: QueryList<ElementRef>;
  @ViewChildren("icons") iconsTags: QueryList<ElementRef>;
  eleList: ElementRef[];
  eleMap: Map<string, ElementRef>;
  iconsMap: Map<string, ElementRef>;
  TREEVIEW_SUFFIX: string = "_treeView";
  ICON_SUFFIX: string = "_icon";
  _EXPAND: string = "aria-expanded";
  DATA_CHILDCOUNT = "data-childcount";
  DATA_LID: string = "data-lid";
  DATA_CODE: string = "data-code";
  DATA_ISFIRST: string = "data-first";
  DATA_ISLAST: string = "data-last";
  TAB_INDEX: string = "tabindex";
  currActiveElement: string;

  constructor(private loginSerivce: LoginService, private router: Router, private hierarchyService: HierarchyService, private render: Renderer2) { }

  ngOnInit() {
    if (this.loginSerivce.currentUserValue() === "" || this.loginSerivce.currentUserValue() === null) {
      this.router.navigate([""]);
    }
    else {
      var user = this.loginSerivce.currentUserValue();
      this.userName = user.username;
      this.getData();
    }
  }

  ngAfterViewInit(): void {
    this.createInitMap();
    this.options.changes.subscribe(() => {
      this.eleList = this.options.toArray();

      if (this.eleList != null && Array.isArray(this.eleList)) {
        this.currActiveElement = this.eleList[0].nativeElement.id;
      }
    });
  }

  logout() {
    this.loginSerivce.logout(this.loginSerivce.currentUserValue().key).subscribe(data => {
      this.router.navigate([""]);
    })
  }

  getData() {
    this.hierarchyService.getHierarchy(this.loginSerivce.currentUserValue().key).subscribe(data => {
      this.hierarchies.push(data.entity.nodeStandardMetadata);
    })
  }

  getStateItem(item: any) {
    let state: string = null;
    if (item !== null && item.children !== null) {
      return "false";
    }
    return state;
  }

  createInitMap() {
    this.eleMap = new Map<string, ElementRef>();
    this.options.changes.subscribe(() => {
      this.options.forEach((eleRef: ElementRef, index: number, optionsarray: ElementRef[]) => {
        this.render.setAttribute(eleRef.nativeElement, "data-lid", String(index));
        this.eleMap.set(eleRef.nativeElement.id, eleRef);
      });
    });

    this.iconsMap = new Map<string, ElementRef>();
    this.iconsTags.changes.subscribe(() => {
      this.iconsTags.forEach((eleRef: ElementRef, index: number, optionsarray: ElementRef[]) => {
        this.iconsMap.set(eleRef.nativeElement.id, eleRef);
      });
    });

  }

  toggleItem($e: any, item: any) {
    this.options.some((eleRef: ElementRef, index: number, optionsArray: ElementRef[]) => {
      console.log(eleRef);
      console.log("Index " + index);
      let code = eleRef.nativeElement.getAttribute("data-code");
      console.log(code + " - " + item.nodeId);
      if (code == item.nodeId) {
        let isExpand = eleRef.nativeElement.getAttribute(this._EXPAND);
        let flag = (isExpand == "true") ? "false" : "true";
        this.setElementAttr(eleRef, this._EXPAND, flag);
        let state: string = "aria-expaneded for " + item.displayName + " is " + flag;

        if (this.currActiveElement !== null) {
          console.log(this.currActiveElement);
          let _eleRef = this.eleMap.get(this.currActiveElement);
          if (_eleRef !== null) {
            this.setElementAttr(_eleRef, this.TAB_INDEX, "-1");
            this.setElementAttr(eleRef, this.TAB_INDEX, "0");
            this.currActiveElement = eleRef.nativeElement.id;
          }
        }
        return true;
      }

    });
  }

  setElementAttr(eleRef: ElementRef, attr: string, value: string) {
    //console.log(eleRef);
    this.render.setAttribute(eleRef.nativeElement, attr, value);
  }

  setTabIndex(role: string, index: number) {
    return (role === "tree" && index === 0) ? "0" : "-1";
  }

  getExpand(item: any) {
    console.log(item);
    if (item != null && item.children != null && item.children.length > 0) {
      return "fa fa-chevron-down";
    }
    return "";
  }


}
