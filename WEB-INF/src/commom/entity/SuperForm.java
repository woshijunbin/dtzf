package commom.entity;

import org.apache.struts.action.ActionForm;

import commom.util.ShowPage;

public class SuperForm extends ActionForm{

	private static final long serialVersionUID = -5727247430529573717L;
	ShowPage sp = new ShowPage(); //分页对象


	public SuperForm(ShowPage sp) {
		super();
		this.sp = sp;
	}


	public SuperForm() {
		super();
	}


	public ShowPage getSp() {
		return sp;
	}


	public void setSp(ShowPage sp) {
		this.sp = sp;
	}
	
	
}
