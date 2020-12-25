package com.reactnativeandroid.ui.home;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.text.Editable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import com.reactnativeandroid.R;
import com.reactnativeandroid.RnInit;

public class HomeFragment extends Fragment {

    private HomeViewModel homeViewModel;
    Button rnBtn;
    EditText rnInput;
    TextView textView;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        homeViewModel =
                new ViewModelProvider(this).get(HomeViewModel.class);
        View root = inflater.inflate(R.layout.fragment_home, container, false);
        textView = root.findViewById(R.id.text_home);
        rnBtn = root.findViewById(R.id.reactbtn);
        rnInput = root.findViewById(R.id.input);
        rnBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(getActivity());
                SharedPreferences.Editor editor = prefs.edit();
                editor.putString("textView", rnInput.getText().toString().trim());
                editor.apply();
                Intent intent = new Intent(getActivity(), RnInit.class);
                startActivity(intent);
            }
        });

        homeViewModel.getText().observe(getViewLifecycleOwner(), new Observer<String>() {
            @Override
            public void onChanged(@Nullable String s) {
                rnInput.setText(s);
            }
        });


        return root;
    }


    public String getStringFromInput() {
        String value = textView.getText().toString();
        return value;
    }

    ;

}