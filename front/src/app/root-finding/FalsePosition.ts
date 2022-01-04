import * as math from "mathjs"

export class FalsePosition{
    private xLower:number;
    private xUpper:number;
    private tolerance:number;
    private precision:number;
    private expression:string;
    private maxIterations:number;
  
    constructor(xLower:number,xUpper:number,tolerance:number,precision:number,expression:string,maxIterations:number){
      this.xLower = xLower
      this.xUpper = xUpper
      this.tolerance = tolerance
      this.precision = precision
      this.expression = expression
      this.maxIterations = maxIterations
    }
    public getXLower():number{
      return this.xLower
    }
    public getXUpper():number{
      return this.xUpper
    }
    public getTolerance():number{
      return this.tolerance
    }
    public getPrecision():number{
      return this.precision
    }
    public getExpression():string{
      return this.expression
    }
    public getMaxIterations():number{
      return this.maxIterations
    }
    public setXLower(x:number):void{
      this.xLower = x
    }
    public setXUpper(x:number):void{
      this.xUpper = x
    }
    public setTolerance(tolerance :number):void{
      this.tolerance = tolerance
    }
    public setPrecision(precision:number):void{
      this.precision = precision
    }
    public setExpression(exp:string):void{
      this.expression = exp
    }
    public setMaxIterations(maxIterations:number):void{
      this.maxIterations = maxIterations
    }
    public substitute(x:number):number{
        var substitution = this.getExpression()
        return math.simplify(math.parse(substitution).toString()).evaluate({x:x}).toPrecision(this.getPrecision())
    }
    public precise(x:number) {
        return parseInt(Number.parseFloat(x.toString()).toPrecision(this.getPrecision()));
    }
    public applyFalsePosition():number{
        var iteration_counter = 0
        var xu = this.getXUpper()
        var xl = this.getXLower()
        var eps = this.getTolerance()
        var maxIterations = this.getMaxIterations()
        var xr:number=0;
        var fr:number;
        var fl:number;
        var fu:number;
        if(math.abs(xu -xl) > eps) 
          return xu;
        while ((math.abs(xu -xl) > eps) && (iteration_counter < maxIterations)){
            
          fl = this.substitute(xl);
          fu = this.substitute(xu);
          xr = this.precise(xu-
                    this.precise( fu* 
                        this.precise(    
                            (this.precise(xu-xl)
                            /this.precise(fu-fl)
                            )
                        )
                    )
                );
          fr = this.substitute(xr);
          if (fl*fr > 0){
            xl = xr;
          }
          else{
            xu = xr;
          }
          iteration_counter = iteration_counter + 1;
        }
    
        return xr;
      }
}